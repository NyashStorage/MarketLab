import type { LinkModel } from '../../src/links/models/link.model.js';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util.js';
import { v4 as uuid } from 'uuid';
import type { CreateLinkType } from '../../src/links/types/link.type.js';

export function mockLink({ payload }: CreateLinkType): LinkModel {
  return {
    id: uuid(),
    payload,
    createdAt: new Date(),
    deletedAt: null,
  };
}

export const EXISTENT_LINK: LinkModel = {
  id: uuid(),
  payload: randomStringGenerator(),
  createdAt: new Date(),
  deletedAt: null,
};

export const DELETED_LINK: LinkModel = {
  id: uuid(),
  payload: randomStringGenerator(),
  createdAt: new Date(),
  deletedAt: new Date(),
};

export const LINK_BY_ID = [EXISTENT_LINK, DELETED_LINK].reduce<
  Record<string, LinkModel>
>((previous, link) => {
  previous[link.id] = link;
  return previous;
}, {});
