import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Public: List all experiences for resume / timeline section
   */
  async findAll() {
    return this.prisma.experience.findMany({
      orderBy: [{ sortOrder: 'asc' }, { startDate: 'desc' }],
    });
  }

  /**
   * Admin: Find single experience by ID
   */
  async findById(id: string) {
    const experience = await this.prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }

    return experience;
  }

  /**
   * Admin: Create new experience
   */
  async create(dto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
      },
    });
  }

  /**
   * Admin: Update experience
   */
  async update(id: string, dto: UpdateExperienceDto) {
    await this.findById(id);

    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate !== undefined) {
      data.endDate = dto.endDate ? new Date(dto.endDate) : null;
    }

    return this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  /**
   * Admin: Delete experience
   */
  async delete(id: string) {
    await this.findById(id);

    return this.prisma.experience.delete({
      where: { id },
    });
  }
}

