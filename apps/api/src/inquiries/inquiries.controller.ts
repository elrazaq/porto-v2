import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { PermissionsGuard } from '../auth/permissions.guard.js';
import { RequirePermissions } from '../auth/require-permissions.decorator.js';
import { InquiriesService } from './inquiries.service.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async submit(@Body() dto: CreateInquiryDto, @Req() req: Request) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      typeof forwarded === 'string'
        ? forwarded.split(',')[0].trim()
        : req.ip || req.socket?.remoteAddress;

    return this.inquiriesService.create(dto, ip);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('inquiries:read')
  async getAll(
    @Query('isRead') isRead?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const isReadBool =
      isRead === 'true' ? true : isRead === 'false' ? false : undefined;
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 20;

    return this.inquiriesService.findAll(isReadBool, pageNum, limitNum);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('inquiries:manage')
  async markRead(@Param('id') id: string) {
    return this.inquiriesService.markAsRead(id);
  }

  @Patch(':id/archive')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('inquiries:manage')
  async toggleArchive(@Param('id') id: string) {
    return this.inquiriesService.toggleArchive(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('inquiries:manage')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return this.inquiriesService.delete(id);
  }
}

