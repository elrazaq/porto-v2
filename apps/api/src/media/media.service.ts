import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CloudinaryService,
  CloudinaryUploadResult,
  GalleryImageUploadResult,
} from '../cloudinary/cloudinary.service.js';

export interface ExpressUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class MediaService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadSingle(
    file: ExpressUploadedFile,
    folder?: string,
  ): Promise<CloudinaryUploadResult> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File is required for upload');
    }

    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedMimes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type (${file.mimetype}). Allowed types: JPG, PNG, WebP, SVG.`,
      );
    }

    return this.cloudinaryService.uploadImage(file.buffer, folder);
  }

  async uploadGallery(
    files: ExpressUploadedFile[],
    folder?: string,
  ): Promise<GalleryImageUploadResult[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required for gallery upload');
    }

    const items = files.map((f, index) => ({
      buffer: f.buffer,
      caption: f.originalname,
      sortOrder: index,
    }));

    return this.cloudinaryService.uploadMultipleImages(items, folder);
  }

  async remove(publicId: string): Promise<{ success: boolean; result: string }> {
    if (!publicId) {
      throw new BadRequestException('Public ID is required to delete media');
    }

    const res = await this.cloudinaryService.deleteImage(publicId);
    return { success: true, result: res.result };
  }
}

