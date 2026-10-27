import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { MediaModule } from './media/media.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { ExperiencesModule } from './experiences/experiences.module.js';
import { SkillsModule } from './skills/skills.module.js';
import { InquiriesModule } from './inquiries/inquiries.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/api/.env'],
    }),
    PrismaModule,
    AuthModule,
    CloudinaryModule,
    MediaModule,
    ProjectsModule,
    ExperiencesModule,
    SkillsModule,
    InquiriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
