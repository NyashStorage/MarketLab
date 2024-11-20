import type { LinkModel } from '../models/link.model.js';
import type { CreateLinkType } from '../types/link.type.js';

export abstract class LinksRepository {
  public abstract create(entity: CreateLinkType): Promise<LinkModel>;
  public abstract get(id: string): Promise<LinkModel | null>;
  public abstract delete(id: string): Promise<boolean>;
}
