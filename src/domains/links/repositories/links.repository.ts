import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from '../entities/link.entity.js';
import { Repository } from 'typeorm';
import { LinkModel } from '../models/link.model.js';
import { CreateLinkType } from '../types/link.type.js';

@Injectable()
export class LinksRepository {
  public constructor(
    @InjectRepository(LinkEntity)
    private readonly repo: Repository<LinkEntity>,
  ) {}

  public create(entity: CreateLinkType): Promise<LinkModel> {
    const createdEntity = new LinkEntity();
    Object.assign(createdEntity, entity);

    return this.repo.save(createdEntity);
  }

  public get(id: string): Promise<LinkModel | null> {
    return this.repo.createQueryBuilder('links').where({ id }).getOne();
  }

  public async delete(id: string): Promise<boolean> {
    const { affected } = await this.repo.softDelete({ id });

    return (affected ?? 0) > 0;
  }
}
