import type { LinkModel } from '../models/link.model.js';
import type { CreateLinkType } from '../types/link.type.js';

export type LinksRepository = {
  create(entity: CreateLinkType): Promise<LinkModel>;
  get(id: string): Promise<LinkModel | null>;
  delete(id: string): Promise<boolean>;
};
