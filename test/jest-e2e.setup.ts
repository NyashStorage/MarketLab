import type { SuperAgentTest } from 'supertest';
import { agent } from 'supertest';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app/app.module.js';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { cleanup, seed } from './helpers/seeding.helper.ts';
import { DataSource } from 'typeorm';
import { OPTIONS } from '../src/database/data-source-options.js';
import { bootstrap } from '../src/core.js';

export let supertestAgent: SuperAgentTest;
let app: INestApplication;
let source: DataSource;

global.beforeAll(async () => {
  // Создаём тестовое приложение.
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  // Базово настраиваем приложение.
  await bootstrap(Promise.resolve(app));

  // Подчищаем старые тестовые данные, если такие остались.
  source = new DataSource(OPTIONS);
  await cleanup(source);

  supertestAgent = agent(app.getHttpServer()) as unknown as SuperAgentTest;
});

global.afterAll(async () => {
  await app.close();
});

global.beforeEach(async () => {
  await seed(source);
});

global.afterEach(async () => {
  await cleanup(source);
});
