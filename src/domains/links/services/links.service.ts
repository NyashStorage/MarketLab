import { Injectable } from '@nestjs/common';
import { LinksRepository } from '../repositories/links.repository.js';
import { LinkModel } from '../models/link.model.js';
import { CreateLinkRequest } from '../dto/requests/create-link.request.js';
import { EntityNotFoundException } from '../../../app/exceptions/EntityNotFoundException.js';

@Injectable()
export class LinksService {
  public constructor(private readonly linksRepository: LinksRepository) {}

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
