import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module.js';
import { LinksModule } from '../links/links.module.js';

/**
 * Модули с исключительно пользовательским функционалом, описывающиеся в публичной документации.
 */
export const PUBLIC_MODULES = [LinksModule];

/**
 * Модули с системным функционалом, не описывающиеся в публичной документации.
 */
const privateModules = [];

export const ALL_MODULES = [...PUBLIC_MODULES, ...privateModules];

@Module({
  imports: [DatabaseModule, ...ALL_MODULES],
})
export class AppModule {}
