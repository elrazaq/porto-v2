import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { PermissionsGuard } from '../auth/permissions.guard.js';
import { RequirePermissions } from '../auth/require-permissions.decorator.js';
import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { AddProjectImageDto } from './dto/add-project-image.dto.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // ==========================================
  // PUBLIC ENDPOINTS
  // ==========================================

  @Get()
  async getShowcase() {
    return this.projectsService.findAllPublished();
  }

  @Get(':slug')
  async getDetail(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  // ==========================================
  // ADMIN MUTATION ENDPOINTS
  // ==========================================

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:read')
  async getAllAdmin() {
    return this.projectsService.findAllAdmin();
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:manage')
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:manage')
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:manage')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:manage')
  async addImage(
    @Param('id') projectId: string,
    @Body() dto: AddProjectImageDto,
  ) {
    return this.projectsService.addImage(projectId, dto);
  }

  @Delete('images/:imageId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('projects:manage')
  @HttpCode(HttpStatus.OK)
  async removeImage(@Param('imageId') imageId: string) {
    return this.projectsService.removeImage(imageId);
  }
}

