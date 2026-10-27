import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required to seed roles and permissions');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
const definitions = [
  { key: 'profile:read', description: 'Read own profile', roles: ['admin', 'user'] },
  { key: 'users:read', description: 'Read users', roles: ['admin'] },
  { key: 'users:manage', description: 'Manage users', roles: ['admin'] },
];

try {
  const roles = {};
  for (const name of ['admin', 'user']) {
    roles[name] = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} role` },
    });
  }

  for (const definition of definitions) {
    const permission = await prisma.permission.upsert({
      where: { key: definition.key },
      update: { description: definition.description },
      create: { key: definition.key, description: definition.description },
    });
    for (const roleName of definition.roles) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: roles[roleName].id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: { roleId: roles[roleName].id, permissionId: permission.id },
      });
    }
  }
} finally {
  await prisma.$disconnect();
}