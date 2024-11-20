import { DELETED_LINK, EXISTENT_LINK } from '../fixtures/links.fixture.ts';
import type { DataSource } from 'typeorm';
import { LinkEntity } from '../../src/domains/links/entities/link.entity.js';

async function seedLink(source: DataSource): Promise<void> {
  await source
    .createQueryBuilder<LinkEntity>(LinkEntity, 'links')
    .insert()
    .values([EXISTENT_LINK, DELETED_LINK])
    .execute();
}

export async function seed(source: DataSource): Promise<void> {
  if (!source.isInitialized) await source.initialize();

  await seedLink(source);
}

async function cleanupLink(source: DataSource): Promise<void> {
  await source
    .createQueryBuilder<LinkEntity>(LinkEntity, 'links')
    // В обычной ситуации здесь более безопасное условие, но в рамках тестового задания пойдёт².
    .where('links.id IS NOT NULL')
    .delete()
    .execute();
}

export async function cleanup(source: DataSource): Promise<void> {
  if (!source.isInitialized) await source.initialize();

  await cleanupLink(source);
}
