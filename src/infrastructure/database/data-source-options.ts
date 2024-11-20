import type { DataSourceOptions } from 'typeorm';
import { CONFIGURATION } from '../../config/configuration.js';
import { isDevelopmentMode } from '../../utils/helpers/development.helper.js';
import { LinkEntity } from '../../domains/links/entities/link.entity.js';
import { AddLinkEntity1732030799337 } from './migrations/1732030799337-AddLinkEntity.js';

export const OPTIONS: DataSourceOptions = {
  type: 'postgres',
  url: CONFIGURATION.DATABASE_URL,
  logging: isDevelopmentMode() ? ['query'] : ['error'],
  entities: [LinkEntity],
  migrations: [AddLinkEntity1732030799337],
};
