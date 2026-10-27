import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';

@Injectable()
export class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Public: Submit a new inquiry from the contact form
   */
  async create(dto: CreateInquiryDto, ipAddress?: string) {
    const inquiry = await this.prisma.contactInquiry.create({
      data: {
        ...dto,
        ipAddress: ipAddress || null,
      },
    });

    return {
      success: true,
      message: 'Pesan Anda berhasil dikirim! Terima kasih telah menghubungi.',
      id: inquiry.id,
    };
  }

  /**
   * Admin: List all inquiries with optional isRead filter and pagination
   */
  async findAll(isRead?: boolean, page = 1, limit = 20) {
    const where: any = {};
    if (isRead !== undefined) {
      where.isRead = isRead;
    }

    const skip = (page - 1) * limit;

    const [items, total, unreadCount] = await Promise.all([
      this.prisma.contactInquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactInquiry.count({ where }),
      this.prisma.contactInquiry.count({ where: { isRead: false } }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        unreadCount,
      },
    };
  }

  /**
   * Admin: Find single inquiry by ID
   */
  async findById(id: string) {
    const inquiry = await this.prisma.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID "${id}" not found`);
    }

    return inquiry;
  }

  /**
   * Admin: Mark inquiry as read
   */
  async markAsRead(id: string) {
    await this.findById(id);

    return this.prisma.contactInquiry.update({
      where: { id },
      data: { isRead: true },
    });
  }

  /**
   * Admin: Toggle archive status
   */
  async toggleArchive(id: string) {
    const existing = await this.findById(id);

    return this.prisma.contactInquiry.update({
      where: { id },
      data: { isArchived: !existing.isArchived },
    });
  }

  /**
   * Admin: Delete inquiry
   */
  async delete(id: string) {
    await this.findById(id);

    return this.prisma.contactInquiry.delete({
      where: { id },
    });
  }
}

