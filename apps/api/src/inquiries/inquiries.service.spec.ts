import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { InquiriesService } from './inquiries.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotFoundException } from '@nestjs/common';

describe('InquiriesService', () => {
  let service: InquiriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiriesService,
        {
          provide: PrismaService,
          useValue: {
            contactInquiry: {
              create: vi.fn(),
              findMany: vi.fn(),
              findUnique: vi.fn(),
              count: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InquiriesService>(InquiriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an inquiry with ip and return success response', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Project Inquiry',
        message: 'Interested in working together.',
      };

      vi.mocked(prisma.contactInquiry.create).mockResolvedValue({
        id: 'inq_1',
        ...dto,
        isRead: false,
        isArchived: false,
        ipAddress: '127.0.0.1',
        createdAt: new Date(),
      } as any);

      const res = await service.create(dto, '127.0.0.1');
      expect(prisma.contactInquiry.create).toHaveBeenCalledWith({
        data: { ...dto, ipAddress: '127.0.0.1' },
      });
      expect(res.success).toBe(true);
      expect(res.id).toBe('inq_1');
    });
  });

  describe('markAsRead', () => {
    it('should throw NotFoundException if not found', async () => {
      vi.mocked(prisma.contactInquiry.findUnique).mockResolvedValue(null);

      await expect(service.markAsRead('unknown')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});

