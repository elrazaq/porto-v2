import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

if (!process.env.DATABASE_URL && typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile('apps/api/.env');
  } catch {
    try {
      process.loadEnvFile('.env');
    } catch {}
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.use(cookieParser());
  const webOrigin = config.get<string>('WEB_ORIGIN') ?? 'http://localhost:5173';
  const origins = webOrigin.includes(',')
    ? webOrigin.split(',').map((o) => o.trim())
    : webOrigin;
  app.enableCors({
    origin: origins,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
}
await bootstrap();
