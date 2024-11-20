import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponse {
  @ApiProperty()
  public readonly message: string[];

  @ApiProperty({ example: 'Bad Request' })
  public readonly error: string;

  @ApiProperty({ example: 400 })
  public readonly statusCode: number;
}