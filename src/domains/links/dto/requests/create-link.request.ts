import type { CreateLinkType } from '../../types/link.type.js';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkRequest implements CreateLinkType {
  @ApiProperty({ minLength: 1 })
  @IsString()
  @IsNotEmpty()
  public readonly payload: string;
}
