import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProjectsService } from './projects.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import { NotFoundException } from '@nestjs/common';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PrismaService,
          useValue: {
            project: {
              findMany: vi.fn(),
              findUnique: vi.fn(),
              findFirst: vi.fn(),
              create: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
            projectImage: {
              create: vi.fn(),
              findUnique: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            deleteImage: vi.fn().mockResolvedValue({ result: 'ok' }),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllPublished', () => {
    it('should return published projects', async () => {
      const mockProjects = [
        { id: '1', title: 'SIMRS Cloud', slug: 'simrs-cloud', isPublished: true },
      ];
      vi.mocked(prisma.project.findMany).mockResolvedValue(mockProjects as any);

      const res = await service.findAllPublished();
      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { isPublished: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        include: { images: { orderBy: { sortOrder: 'asc' } } },
      });
      expect(res).toEqual(mockProjects);
    });
  });

  describe('findBySlug', () => {
    it('should return project detail with images when published', async () => {
      const mockProject = {
        id: '1',
        title: 'SIMRS Cloud',
        slug: 'simrs-cloud',
        isPublished: true,
        images: [{ id: 'img1', url: 'https://img.com/1.png' }],
      };
      vi.mocked(prisma.project.findUnique).mockResolvedValue(mockProject as any);

      const res = await service.findBySlug('simrs-cloud');
      expect(res.slug).toBe('simrs-cloud');
      expect(res.images).toHaveLength(1);
    });

    it('should throw NotFoundException when project does not exist', async () => {
      vi.mocked(prisma.project.findUnique).mockResolvedValue(null);

      await expect(service.findBySlug('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
