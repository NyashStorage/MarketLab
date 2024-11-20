import type { LinkModel } from '../../models/link.model.js';
import { ApiProperty } from '@nestjs/swagger';

export class GetLinkResponse {
  @ApiProperty({ minLength: 1 })
  public readonly payload: string;

  public constructor({ payload }: LinkModel) {
    this.payload = payload;
  }
}
