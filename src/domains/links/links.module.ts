import { Module } from '@nestjs/common';
import { LinksController } from './controllers/links.controller.js';
import { LinksService } from './services/links.service.js';
import { LinksTypeormRepository } from './repositories/typeorm/links.typeorm-repository.js';
import { LinksRepository } from './repositories/links.repository.js';

@Module({
  controllers: [LinksController],
  providers: [
    LinksService,
    {
      provide: LinksRepository,
      useClass: LinksTypeormRepository,
    },
  ],
  exports: [LinksService],
})
export class LinksModule {}
