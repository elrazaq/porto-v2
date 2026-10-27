import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword, verifyPassword } from './password-hasher.js';

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const INVALID_CREDENTIALS = 'Invalid email or password';

type SafeUser = {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
};

type RefreshClaims = { sub: string; familyId: string; tokenType: 'refresh' };

function tokenHash(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(email: string, password: string, name?: string): Promise<SafeUser> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          passwordHash: await hashPassword(password),
          name: name?.trim() || null,
          roles: { create: { role: { connect: { name: 'user' } } } },
        },
        include: { roles: { include: { role: { select: { name: true } } } } },
      });
      return this.toSafeUser(user);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already registered');
      }
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ user: SafeUser; accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { roles: { include: { role: { select: { name: true } } } } },
    });

    if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const safeUser = this.toSafeUser(user);
    const tokens = await this.issueTokens(this.prisma, safeUser, randomUUID());
    return { user: safeUser, ...tokens };
  }

  async refresh(token: string): Promise<{ user: SafeUser; accessToken: string; refreshToken: string }> {
    let claims: RefreshClaims;
    try {
      claims = await this.jwt.verifyAsync<RefreshClaims>(token, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      await this.prisma.$transaction(async (transaction) => {
        const stored = await transaction.refreshToken.findUnique({
          where: { tokenHash: tokenHash(token) },
        });
        if (stored?.revokedAt) {
          await transaction.refreshToken.updateMany({
            where: { familyId: stored.familyId, revokedAt: null },
            data: { revokedAt: new Date() },
          });
        }
      });
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    if (claims.tokenType !== 'refresh' || !claims.sub || !claims.familyId) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }

    const outcome = await this.prisma.$transaction(async (transaction) => {
      const stored = await transaction.refreshToken.findUnique({
        where: { tokenHash: tokenHash(token) },
      });
      if (!stored || stored.userId !== claims.sub || stored.familyId !== claims.familyId) {
        return { status: 'invalid' as const };
      }

      if (stored.revokedAt || stored.expiresAt <= new Date()) {
        if (stored.revokedAt) {
          await transaction.refreshToken.updateMany({
            where: { familyId: stored.familyId, revokedAt: null },
            data: { revokedAt: new Date() },
          });
        }
        return { status: 'invalid' as const };
      }

      const revoked = await transaction.refreshToken.updateMany({
        where: { id: stored.id, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      if (revoked.count !== 1) {
        await transaction.refreshToken.updateMany({
          where: { familyId: stored.familyId, revokedAt: null },
          data: { revokedAt: new Date() },
        });
        return { status: 'invalid' as const };
      }

      const user = await transaction.user.findUnique({
        where: { id: claims.sub },
        include: { roles: { include: { role: { select: { name: true } } } } },
      });
      if (!user?.isActive) {
        await transaction.refreshToken.updateMany({
          where: { familyId: stored.familyId, revokedAt: null },
          data: { revokedAt: new Date() },
        });
        return { status: 'invalid' as const };
      }

      const safeUser = this.toSafeUser(user);
      const tokens = await this.issueTokens(transaction, safeUser, stored.familyId);
      return { status: 'ok' as const, user: safeUser, ...tokens };
    });

    if (outcome.status !== 'ok') {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    return outcome;
  }

  async logout(token?: string): Promise<void> {
    if (!token) return;
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash: tokenHash(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async getProfile(userId: string): Promise<SafeUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        roles: { select: { role: { select: { name: true } } } },
      },
    });
    if (!user?.isActive) throw new UnauthorizedException();
    return this.toSafeUser(user);
  }

  private async issueTokens(
    database: Pick<PrismaService, 'refreshToken'>,
    user: SafeUser,
    familyId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, tokenType: 'access' },
      {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: ACCESS_TTL,
      },
    );
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id, familyId, tokenType: 'refresh' },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: REFRESH_TTL,
      },
    );
    await database.refreshToken.create({
      data: {
        tokenHash: tokenHash(refreshToken),
        familyId,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TTL_MS),
      },
    });
    return { accessToken, refreshToken };
  }

  private toSafeUser(user: {
    id: string;
    email: string;
    name: string | null;
    roles: { role: { name: string } }[];
  }): SafeUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles.map(({ role }) => role.name),
    };
  }
}
