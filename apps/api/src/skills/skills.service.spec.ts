import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SkillsService } from './skills.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';
import { SkillCategory } from '../generated/prisma/enums.js';

describe('SkillsService', () => {
  let service: SkillsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: PrismaService,
          useValue: {
            skill: {
              findMany: vi.fn(),
              findUnique: vi.fn(),
              create: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllGrouped', () => {
    it('should return skills grouped into categories', async () => {
      const mockSkills = [
        { id: '1', name: 'React', category: SkillCategory.FRONTEND, sortOrder: 1 },
        { id: '2', name: 'NestJS', category: SkillCategory.BACKEND, sortOrder: 1 },
      ];
      vi.mocked(prisma.skill.findMany).mockResolvedValue(mockSkills as any);

      const res = await service.findAllGrouped();
      expect(res.FRONTEND).toHaveLength(1);
      expect(res.FRONTEND[0].name).toBe('React');
      expect(res.BACKEND).toHaveLength(1);
      expect(res.BACKEND[0].name).toBe('NestJS');
      expect(res.DATABASE).toHaveLength(0);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException when not found', async () => {
      vi.mocked(prisma.skill.findUnique).mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

