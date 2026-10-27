import { Module } from '@nestjs/common';
import { MediaController } from './media.controller.js';
import { MediaService } from './media.service.js';
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [CloudinaryModule, PrismaModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}

