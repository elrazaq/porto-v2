import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { hashPassword } from './password-hasher.js';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: { create: ReturnType<typeof vi.fn>; findUnique: ReturnType<typeof vi.fn> };
    role: { findUnique: ReturnType<typeof vi.fn> };
    refreshToken: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      updateMany: ReturnType<typeof vi.fn>;
    };
    $transaction: ReturnType<typeof vi.fn>;
  };
  let jwt: { signAsync: ReturnType<typeof vi.fn>; verifyAsync: ReturnType<typeof vi.fn> };
  let config: { getOrThrow: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    prisma = {
      user: { create: vi.fn(), findUnique: vi.fn() },
      role: { findUnique: vi.fn() },
      refreshToken: { create: vi.fn(), findUnique: vi.fn(), updateMany: vi.fn() },
      $transaction: vi.fn((callback) => callback(prisma)),
    };
    jwt = { signAsync: vi.fn().mockResolvedValue('signed-token'), verifyAsync: vi.fn() };
    config = {
      getOrThrow: vi.fn((key: string) => `${key}-secret`),
    };
    service = new AuthService(
      prisma as unknown as PrismaService,
      jwt as unknown as JwtService,
      config as unknown as ConfigService,
    );
  });

  it('creates a normalized account with the fixed user role', async () => {
    const user = {
      id: 'user-1',
      email: 'person@example.com',
      name: 'Person',
      roles: [{ role: { name: 'user' } }],
    };
    prisma.role.findUnique.mockResolvedValue({ id: 'role-user' });
    prisma.user.create.mockResolvedValue(user);

    await expect(
      service.register(' Person@Example.com ', 'strong-password', 'Person'),
    ).resolves.toEqual({ id: 'user-1', email: 'person@example.com', name: 'Person', roles: ['user'] });
    expect(prisma.user.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        email: 'person@example.com',
        roles: { create: { role: { connect: { name: 'user' } } } },
      }),
    }));
  });

  it('returns the same generic error for incorrect and inactive accounts', async () => {
    const passwordHash = await hashPassword('correct-password');
    prisma.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 'user-1', isActive: false, passwordHash });

    const failures = await Promise.all([
      service.login('person@example.com', 'wrong-password').catch((error: unknown) => error),
      service.login('person@example.com', 'correct-password').catch((error: unknown) => error),
    ]);

    expect(failures[0]).toBeInstanceOf(UnauthorizedException);
    expect(failures[1]).toBeInstanceOf(UnauthorizedException);
    expect((failures[0] as Error).message).toBe((failures[1] as Error).message);
  });

  it('persists only a SHA-256 hash of the issued refresh token', async () => {
    const passwordHash = await hashPassword('correct-password');
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'person@example.com',
      name: 'Person',
      isActive: true,
      passwordHash,
      roles: [{ role: { name: 'user' } }],
    });
    prisma.refreshToken.create.mockResolvedValue({});

    const result = await service.login('person@example.com', 'correct-password');

    expect(result.refreshToken).toBe('signed-token');
    expect(prisma.refreshToken.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        tokenHash: expect.stringMatching(/^[a-f0-9]{64}$/),
      }),
    }));
    expect(prisma.refreshToken.create.mock.calls[0]?.[0].data.tokenHash).not.toBe(result.refreshToken);
  });

  it('rotates a valid refresh token in the same family', async () => {
    jwt.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      familyId: 'family-1',
      tokenType: 'refresh',
    });
    jwt.signAsync
      .mockResolvedValueOnce('new-access-token')
      .mockResolvedValueOnce('new-refresh-token');
    prisma.refreshToken.findUnique.mockResolvedValue({
      id: 'token-1',
      userId: 'user-1',
      familyId: 'family-1',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
    });
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'person@example.com',
      name: null,
      isActive: true,
      roles: [{ role: { name: 'user' } }],
    });

    const result = await service.refresh('old-refresh-token');

    expect(result.refreshToken).toBe('new-refresh-token');
    expect(prisma.refreshToken.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        familyId: 'family-1',
        tokenHash: expect.stringMatching(/^[a-f0-9]{64}$/),
      }),
    }));
    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'token-1', revokedAt: null },
    }));
  });

  it('revokes a token family when a revoked refresh token is replayed', async () => {
    jwt.verifyAsync.mockResolvedValue({
      sub: 'user-1',
      familyId: 'family-1',
      tokenType: 'refresh',
    });
    prisma.refreshToken.findUnique.mockResolvedValue({
      id: 'token-1',
      userId: 'user-1',
      familyId: 'family-1',
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: new Date(),
    });
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });

    await expect(service.refresh('previous-token')).rejects.toBeInstanceOf(UnauthorizedException);
    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { familyId: 'family-1', revokedAt: null },
    }));
  });

  it('detects replay of a revoked refresh token after its JWT expires', async () => {
    jwt.verifyAsync.mockRejectedValue(new Error('jwt expired'));
    prisma.refreshToken.findUnique.mockResolvedValue({
      familyId: 'family-1',
      revokedAt: new Date(),
    });
    prisma.refreshToken.updateMany.mockResolvedValue({ count: 1 });

    await expect(service.refresh('expired-old-token')).rejects.toBeInstanceOf(UnauthorizedException);
    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { familyId: 'family-1', revokedAt: null },
    }));
  });
});
