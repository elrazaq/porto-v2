import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller.js';
import { SkillsService } from './skills.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}

