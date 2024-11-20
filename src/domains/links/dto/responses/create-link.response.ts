import type { LinkModel } from '../../models/link.model.js';
import { ApiProperty } from '@nestjs/swagger';
import { CONFIGURATION } from '../../../../config/configuration.js';

export class CreateLinkResponse {
  @ApiProperty({
    example: `${CONFIGURATION.API_URL}/0a16c9d4-9872-4938-8be7-7166f4216832`,
  })
  public readonly url: string;

  public constructor({ id }: LinkModel) {
    this.url = `${CONFIGURATION.API_URL}/${id}`;
  }
}
