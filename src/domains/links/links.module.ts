import { Module } from '@nestjs/common';
import { LinksController } from './controllers/links.controller.js';
import { LinksService } from './services/links.service.js';
import { LinksTypeormRepository } from './repositories/typeorm/links.typeorm-repository.js';
import { LINKS_REPOSITORY } from '../../utils/types/constants/di.constant.js';

@Module({
  controllers: [LinksController],
  providers: [
    LinksService,
    {
      provide: LINKS_REPOSITORY,
      useClass: LinksTypeormRepository,
    },
  ],
  exports: [LinksService],
})
export class LinksModule {}
