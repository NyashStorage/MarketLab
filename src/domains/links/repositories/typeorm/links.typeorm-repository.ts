import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from '../../entities/link.entity.js';
import { Repository } from 'typeorm';
import type { LinkModel } from '../../models/link.model.js';
import type { CreateLinkType } from '../../types/link.type.js';
import { LinksRepository } from '../links.repository.js';

@Injectable()
export class LinksTypeormRepository implements LinksRepository {
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
