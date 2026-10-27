import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CloudinaryService } from './cloudinary.service.js';
import { v2 as cloudinary } from 'cloudinary';
import { Writable } from 'node:stream';

vi.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: vi.fn(),
      destroy: vi.fn(),
    },
    url: vi.fn(),
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  const createMockUploadStream = (result: any) => {
    return (_options: any, callback: any) => {
      const writable = new Writable({
        write(_chunk, _encoding, next) {
          next();
        },
      });
      writable.on('finish', () => {
        if (callback) callback(undefined, result);
      });
      return writable;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: string) => {
              if (key === 'CLOUDINARY_FOLDER') return 'portfolio_test';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should upload image buffer successfully', async () => {
      const mockResult = {
        public_id: 'test_id_123',
        secure_url: 'https://res.cloudinary.com/demo/image/upload/v1/test.png',
        url: 'http://res.cloudinary.com/demo/image/upload/v1/test.png',
        width: 800,
        height: 600,
        format: 'png',
        bytes: 12345,
      };

      vi.mocked(cloudinary.uploader.upload_stream).mockImplementation(
        createMockUploadStream(mockResult) as any,
      );

      const buffer = Buffer.from('fake-image-bytes');
      const result = await service.uploadImage(buffer);

      expect(result.publicId).toBe('test_id_123');
      expect(result.secureUrl).toContain('test.png');
      expect(result.format).toBe('png');
    });
  });

  describe('uploadMultipleImages', () => {
    it('should upload an array of gallery images with captions and sort orders', async () => {
      const mockResult = {
        public_id: 'gallery_1',
        secure_url: 'https://res.cloudinary.com/demo/image/upload/v1/gallery_1.png',
        url: 'http://res.cloudinary.com/demo/image/upload/v1/gallery_1.png',
        width: 1200,
        height: 800,
        format: 'png',
        bytes: 54321,
      };

      vi.mocked(cloudinary.uploader.upload_stream).mockImplementation(
        createMockUploadStream(mockResult) as any,
      );

      const items = [
        { buffer: Buffer.from('img1'), caption: 'Architecture Diagram' },
        { buffer: Buffer.from('img2'), caption: 'Database Schema' },
      ];

      const results = await service.uploadMultipleImages(items);

      expect(results).toHaveLength(2);
      expect(results[0].caption).toBe('Architecture Diagram');
      expect(results[0].sortOrder).toBe(0);
      expect(results[1].caption).toBe('Database Schema');
      expect(results[1].sortOrder).toBe(1);
    });
  });

  describe('deleteImage', () => {
    it('should call cloudinary destroy with correct publicId', async () => {
      vi.mocked(cloudinary.uploader.destroy).mockResolvedValue({
        result: 'ok',
      } as any);

      const res = await service.deleteImage('sample_public_id');

      expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
        'sample_public_id',
      );
      expect(res.result).toBe('ok');
    });
  });

  describe('getOptimizedUrl', () => {
    it('should generate optimized URL with transformations', () => {
      vi.mocked(cloudinary.url).mockReturnValue(
        'https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/test_id.webp',
      );

      const url = service.getOptimizedUrl('test_id', { width: 400 });

      expect(cloudinary.url).toHaveBeenCalledWith('test_id', {
        secure: true,
        fetch_format: 'auto',
        quality: 'auto',
        width: 400,
      });
      expect(url).toContain('test_id.webp');
    });
  });
});
