import { PrismaService } from './prisma.service.js';

describe('PrismaService', () => {
  it('requires DATABASE_URL before the client can be created', () => {
    const oldDatabaseUrl = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;

    try {
      expect(() => new PrismaService()).toThrow(
        'DATABASE_URL is required to initialize Prisma',
      );
    } finally {
      if (oldDatabaseUrl === undefined) {
        delete process.env.DATABASE_URL;
      } else {
        process.env.DATABASE_URL = oldDatabaseUrl;
      }
    }
  });
});
