import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExperiencesService } from './experiences.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';

describe('ExperiencesService', () => {
  let service: ExperiencesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperiencesService,
        {
          provide: PrismaService,
          useValue: {
            experience: {
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

    service = module.get<ExperiencesService>(ExperiencesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all experiences ordered', async () => {
      const mockList = [
        {
          id: 'exp1',
          company: 'PT Solusi Digital',
          role: 'Lead Engineer',
          startDate: new Date(),
        },
      ];
      vi.mocked(prisma.experience.findMany).mockResolvedValue(mockList as any);

      const res = await service.findAll();
      expect(prisma.experience.findMany).toHaveBeenCalledWith({
        orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
      });
      expect(res).toEqual(mockList);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException when not found', async () => {
      vi.mocked(prisma.experience.findUnique).mockResolvedValue(null);

      await expect(service.findById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

