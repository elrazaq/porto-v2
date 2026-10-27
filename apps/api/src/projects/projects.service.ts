import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CloudinaryService } from '../cloudinary/cloudinary.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { AddProjectImageDto } from './dto/add-project-image.dto.js';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  /**
   * Public: List all published projects for showcase cards
   */
  async findAllPublished() {
    return this.prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  /**
   * Public: Find project by slug for dedicated detail page (/projects/:slug)
   */
  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!project || !project.isPublished) {
      throw new NotFoundException(`Project with slug "${slug}" not found`);
    }

    return project;
  }

  /**
   * Admin: List all projects (including drafts)
   */
  async findAllAdmin() {
    return this.prisma.project.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  /**
   * Admin: Find by ID
   */
  async findById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return project;
  }

  /**
   * Admin: Create new project
   */
  async create(dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new ConflictException(
        `Project with slug "${dto.slug}" already exists`,
      );
    }

    return this.prisma.project.create({
      data: dto,
      include: {
        images: true,
      },
    });
  }

  /**
   * Admin: Update project
   */
  async update(id: string, dto: UpdateProjectDto) {
    await this.findById(id);

    if (dto.slug) {
      const conflicting = await this.prisma.project.findFirst({
        where: {
          slug: dto.slug,
          NOT: { id },
        },
      });
      if (conflicting) {
        throw new ConflictException(
          `Another project with slug "${dto.slug}" already exists`,
        );
      }
    }

    return this.prisma.project.update({
      where: { id },
      data: dto,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  /**
   * Admin: Delete project and clean up Cloudinary assets
   */
  async delete(id: string) {
    const project = await this.findById(id);

    // Clean up thumbnail from Cloudinary if publicId exists
    if (project.thumbnailPublicId) {
      try {
        await this.cloudinary.deleteImage(project.thumbnailPublicId);
      } catch (err) {
        this.logger.warn(
          `Failed to delete Cloudinary thumbnail ${project.thumbnailPublicId}: ${(err as Error).message}`,
        );
      }
    }

    // Clean up gallery images from Cloudinary
    for (const img of project.images) {
      if (img.publicId) {
        try {
          await this.cloudinary.deleteImage(img.publicId);
        } catch (err) {
          this.logger.warn(
            `Failed to delete Cloudinary gallery image ${img.publicId}: ${(err as Error).message}`,
          );
        }
      }
    }

    // Cascade delete in Prisma DB
    return this.prisma.project.delete({
      where: { id },
    });
  }

  /**
   * Admin: Add image to project gallery
   */
  async addImage(projectId: string, dto: AddProjectImageDto) {
    await this.findById(projectId);

    return this.prisma.projectImage.create({
      data: {
        projectId,
        ...dto,
      },
    });
  }

  /**
   * Admin: Delete image from gallery
   */
  async removeImage(imageId: string) {
    const image = await this.prisma.projectImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException(`Project image with ID "${imageId}" not found`);
    }

    if (image.publicId) {
      try {
        await this.cloudinary.deleteImage(image.publicId);
      } catch (err) {
        this.logger.warn(
          `Failed to delete Cloudinary image ${image.publicId}: ${(err as Error).message}`,
        );
      }
    }

    return this.prisma.projectImage.delete({
      where: { id: imageId },
    });
  }
}

