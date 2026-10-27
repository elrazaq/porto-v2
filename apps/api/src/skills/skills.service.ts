import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSkillDto } from './dto/create-skill.dto.js';
import { UpdateSkillDto } from './dto/update-skill.dto.js';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Public: List all skills grouped by category
   */
  async findAllGrouped() {
    const skills = await this.prisma.skill.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });

    const grouped: Record<string, typeof skills> = {
      FRONTEND: [],
      BACKEND: [],
      DATABASE: [],
      DEVOPS_TOOLS: [],
      DESIGN_OTHER: [],
    };

    for (const skill of skills) {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    }

    return grouped;
  }

  /**
   * Public / Admin: Flat list of all skills
   */
  async findAllFlat() {
    return this.prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
  }

  /**
   * Admin: Find single skill by ID
   */
  async findById(id: string) {
    const skill = await this.prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      throw new NotFoundException(`Skill with ID "${id}" not found`);
    }

    return skill;
  }

  /**
   * Admin: Create new skill
   */
  async create(dto: CreateSkillDto) {
    return this.prisma.skill.create({
      data: dto,
    });
  }

  /**
   * Admin: Update skill
   */
  async update(id: string, dto: UpdateSkillDto) {
    await this.findById(id);

    return this.prisma.skill.update({
      where: { id },
      data: dto,
    });
  }

  /**
   * Admin: Delete skill
   */
  async delete(id: string) {
    await this.findById(id);

    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
