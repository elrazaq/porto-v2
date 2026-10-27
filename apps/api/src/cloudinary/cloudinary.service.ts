import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { Readable } from 'node:stream';

export interface CloudinaryUploadResult {
  publicId: string;
  secureUrl: string;
  url: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export interface GalleryImageUploadItem {
  buffer: Buffer;
  caption?: string;
  sortOrder?: number;
}

export interface GalleryImageUploadResult extends CloudinaryUploadResult {
  caption?: string;
  sortOrder?: number;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private readonly defaultFolder: string;

  constructor(private readonly configService: ConfigService) {
    this.defaultFolder =
      this.configService.get<string>('CLOUDINARY_FOLDER') || 'portfolio';
  }

  /**
   * Upload a single image buffer to Cloudinary
   */
  async uploadImage(
    fileBuffer: Buffer,
    folder?: string,
    tags: string[] = ['portfolio'],
  ): Promise<CloudinaryUploadResult> {
    const targetFolder = folder || this.defaultFolder;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
          tags,
          resource_type: 'image',
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error || !result) {
            this.logger.error(
              `Cloudinary upload failed: ${error?.message || 'Unknown error'}`,
            );
            return reject(error || new Error('Cloudinary upload failed'));
          }

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
            url: result.url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        },
      );

      const stream = Readable.from(fileBuffer);
      stream.pipe(uploadStream);
    });
  }

  /**
   * Upload multiple images for portfolio project gallery
   */
  async uploadMultipleImages(
    files: GalleryImageUploadItem[],
    folder?: string,
  ): Promise<GalleryImageUploadResult[]> {
    const results: GalleryImageUploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const uploadResult = await this.uploadImage(
        item.buffer,
        folder,
        ['portfolio', 'gallery'],
      );
      results.push({
        ...uploadResult,
        caption: item.caption,
        sortOrder: item.sortOrder ?? i,
      });
    }

    return results;
  }

  /**
   * Delete an asset from Cloudinary by public ID
   */
  async deleteImage(publicId: string): Promise<{ result: string }> {
    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return res as { result: string };
    } catch (error) {
      this.logger.error(
        `Failed to delete image ${publicId}: ${(error as Error).message}`,
      );
      throw error;
    }
  }

  /**
   * Generate an optimized responsive URL with transformations
   */
  getOptimizedUrl(
    publicId: string,
    options?: Record<string, any>,
  ): string {
    const extraOptions = options ?? {};
    return cloudinary.url(publicId, {
      secure: true,
      fetch_format: 'auto',
      quality: 'auto',
      ...extraOptions,
    });
  }
}
