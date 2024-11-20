import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export class ParseIdPipe extends ParseUUIDPipe {
  public constructor() {
    super({
      exceptionFactory: () => {
        throw new BadRequestException(['id must be a uuid']);
      },
    });
  }
}
