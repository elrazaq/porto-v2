import { describe, expect, it, vi } from 'vitest';
import { PermissionsGuard } from './permissions.guard.js';
import { REQUIRED_PERMISSIONS } from './require-permissions.decorator.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('PermissionsGuard', () => {
  it('requires every permission assigned through the user roles', async () => {
    const reflector = {
      getAllAndOverride: vi.fn().mockReturnValue(['users:read', 'users:manage']),
    };
    const user = {
      isActive: true,
      roles: [
        {
          role: {
            permissions: [
              { permission: { key: 'users:read' } },
              { permission: { key: 'users:manage' } },
            ],
          },
        },
      ],
    };
    const prisma = { user: { findUnique: vi.fn().mockResolvedValue(user) } };
    const guard = new PermissionsGuard(
      reflector as unknown as Reflector,
      prisma as unknown as PrismaService,
    );
    const context = {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { userId: 'user-1' } }) }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(REQUIRED_PERMISSIONS, [
      context.getHandler(),
      context.getClass(),
    ]);

    prisma.user.findUnique.mockResolvedValue({
      ...user,
      roles: [{ role: { permissions: [{ permission: { key: 'users:read' } }] } }],
    });
    await expect(guard.canActivate(context)).resolves.toBe(false);
  });
});