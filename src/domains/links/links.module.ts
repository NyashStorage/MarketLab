import { Module } from '@nestjs/common';
import { LinksController } from './controllers/links.controller.js';
import { LinksService } from './services/links.service.js';
import { LinksRepository } from './repositories/links.repository.js';

@Module({
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
  exports: [LinksService],
})
export class LinksModule {}
