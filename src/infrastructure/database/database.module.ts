import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OPTIONS } from './data-source-options.js';
import { EntitySchema } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(OPTIONS),
    TypeOrmModule.forFeature(OPTIONS.entities as EntitySchema[]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
