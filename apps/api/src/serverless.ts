import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import express, { type Express } from 'express';
import { AppModule } from './app.module.js';

let cachedServer: Express | null = null;

export async function bootstrapServerless(): Promise<Express> {
  if (!cachedServer) {
    const server = express();

    // Ensure requests route properly to the global /api prefix
    server.use((req, _res, next) => {
      if (!req.url.startsWith('/api')) {
        req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
      }
      next();
    });

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
      logger: ['error', 'warn'],
    });

    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.enableCors({
      origin: true,
      credentials: true,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    cachedServer = server;
  }
  return cachedServer;
}

