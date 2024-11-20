import { Inject, Injectable } from '@nestjs/common';
import type { LinksRepository } from '../repositories/links.repository.js';
import { LinkModel } from '../models/link.model.js';
import { CreateLinkRequest } from '../dto/requests/create-link.request.js';
import { EntityNotFoundException } from '../../../app/exceptions/EntityNotFoundException.js';
import { LINKS_REPOSITORY } from '../../../utils/types/constants/di.constant.js';

@Injectable()
export class LinksService {
  public constructor(
    @Inject(LINKS_REPOSITORY)
    private readonly linksRepository: LinksRepository,
  ) {}

  public async createLink(dto: CreateLinkRequest): Promise<LinkModel> {
    return await this.linksRepository.create(dto);
  }

  /**
   * @param id
   * @param deleteAfterRead=false
   * @throws EntityNotFoundException
   */
  public async getLink(
    id: string,
    deleteAfterRead = false,
  ): Promise<LinkModel> {
    const link = await this.linksRepository.get(id);
    if (!link) throw new EntityNotFoundException();

    if (deleteAfterRead) await this.linksRepository.delete(id);

    return link;
  }
}
