import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { describe, expect, it, vi } from 'vitest';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('JwtAuthGuard', () => {
  it('accepts a valid access token only for an active database user', async () => {
    const request = {
      headers: {},
      cookies: { access_token: 'access-token' },
    };
    const jwt = { verifyAsync: vi.fn().mockResolvedValue({ sub: 'user-1', tokenType: 'access' }) };
    const config = { getOrThrow: vi.fn().mockReturnValue('access-secret') };
    const prisma = { user: { findUnique: vi.fn().mockResolvedValue({ isActive: true }) } };
    const guard = new JwtAuthGuard(
      jwt as unknown as JwtService,
      config as unknown as ConfigService,
      prisma as unknown as PrismaService,
    );
    const context = {
      switchToHttp: () => ({ getRequest: () => request }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request).toHaveProperty('user', { userId: 'user-1' });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      select: { isActive: true },
    });

    prisma.user.findUnique.mockResolvedValue({ isActive: false });
    await expect(guard.canActivate(context)).rejects.toThrow();
  });
});