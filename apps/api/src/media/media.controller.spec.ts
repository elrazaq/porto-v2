import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MediaController } from './media.controller.js';
import { MediaService, ExpressUploadedFile } from './media.service.js';

describe('MediaController', () => {
  let controller: MediaController;
  let service: MediaService;

  beforeEach(() => {
    service = {
      uploadSingle: vi.fn(),
      uploadGallery: vi.fn(),
      remove: vi.fn(),
    } as unknown as MediaService;

    controller = new MediaController(service);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload a single image', async () => {
    const file: ExpressUploadedFile = {
      fieldname: 'file',
      originalname: 'test.png',
      encoding: '7bit',
      mimetype: 'image/png',
      size: 100,
      buffer: Buffer.from('test'),
    };

    const mockResult = {
      publicId: 'test_123',
      secureUrl: 'https://cloudinary.com/test.png',
      url: 'http://cloudinary.com/test.png',
    };

    vi.mocked(service.uploadSingle).mockResolvedValue(mockResult);

    const result = await controller.uploadSingle(file, 'portfolio');
    expect(service.uploadSingle).toHaveBeenCalledWith(file, 'portfolio');
    expect(result).toEqual(mockResult);
  });

  it('should delete an image by publicId', async () => {
    vi.mocked(service.remove).mockResolvedValue({ success: true, result: 'ok' });

    const result = await controller.remove('sample_id');
    expect(service.remove).toHaveBeenCalledWith('sample_id');
    expect(result).toEqual({ success: true, result: 'ok' });
  });
});

