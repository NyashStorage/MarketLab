import type { LinkModel } from '../models/link.model.js';

export type CreateLinkType = Pick<LinkModel, 'payload'>;
