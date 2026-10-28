import {
  Controller,
  Post,
  Delete,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { PermissionsGuard } from '../auth/permissions.guard.js';
import { RequirePermissions } from '../auth/require-permissions.decorator.js';
import { MediaService } from './media.service.js';
import type { ExpressUploadedFile } from './media.service.js';

@Controller('media')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @RequirePermissions('media:upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(
    @UploadedFile() file: ExpressUploadedFile,
    @Query('folder') folder?: string,
  ) {
    return this.mediaService.uploadSingle(file, folder);
  }

  @Post('upload-gallery')
  @RequirePermissions('media:upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadGallery(
    @UploadedFiles() files: ExpressUploadedFile[],
    @Query('folder') folder?: string,
  ) {
    return this.mediaService.uploadGallery(files, folder);
  }

  @Delete()
  @RequirePermissions('media:upload')
  @HttpCode(HttpStatus.OK)
  async removeByQuery(@Query('publicId') publicId: string) {
    return this.mediaService.remove(publicId);
  }

  @Delete(':publicId')
  @RequirePermissions('media:upload')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('publicId') publicId: string) {
    return this.mediaService.remove(publicId);
  }
}
