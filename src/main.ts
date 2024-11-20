import { bootstrap } from './core.js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { FastifyAdapter } from '@nestjs/platform-fastify';

void bootstrap(NestFactory.create(AppModule, new FastifyAdapter()));
