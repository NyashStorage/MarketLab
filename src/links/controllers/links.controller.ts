import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { LinksService } from '../services/links.service.js';
import { CreateLinkRequest } from '../dto/requests/create-link.request.js';
import { EntityNotFoundException } from '../../app/exceptions/EntityNotFoundException.js';
import { CreateLinkResponse } from '../dto/responses/create-link.response.js';
import { GetLinkResponse } from '../dto/responses/get-link.response.js';
import { ApiError } from '../../types/enums/api-error.enum.js';
import { Describe } from '../../app/decorators/describe.decorator.js';
import { ValidationErrorResponse } from '../../app/dto/responses/validation-error.response.js';
import { ParseIdPipe } from '../../app/pipes/parse-id.pipe.js';

@Controller('links')
export class LinksController {
  public constructor(private readonly linksService: LinksService) {}

  @Post()
  @Describe(
    'Сохранить данные по новой ссылке',
    { type: CreateLinkResponse },
    {
      description: ApiError.VALIDATION_ERROR,
      type: ValidationErrorResponse,
      code: HttpStatus.BAD_REQUEST,
    },
  )
  public async createLink(
    @Body() dto: CreateLinkRequest,
  ): Promise<CreateLinkResponse> {
    return new CreateLinkResponse(await this.linksService.createLink(dto));
  }

  @Get(':id')
  @Describe(
    'Получить данные по ранее сгенерированной ссылке',
    { type: GetLinkResponse },
    { description: ApiError.LINK_NOT_FOUND, code: HttpStatus.NOT_FOUND },
  )
  public async getLink(
    @Param('id', new ParseIdPipe()) id: string,
  ): Promise<GetLinkResponse> {
    // Можно не заморачиваться и сразу в LinksService выбрасывать
    // NotFoundException, но привязывать сервис к фреймворку и контексту
    // выглядит не совсем правильно, поэтому обработку HTTP части вынес в контроллер.

    // Так же, можно было в сервисе просто вызывать метод репозитория
    // и здесь работать с "ILinkModel | null", но получать "ILinkModel | Error"
    // выглядит более подходящим для сервиса.

    try {
      return new GetLinkResponse(await this.linksService.getLink(id, true));
    } catch (exception: unknown) {
      if (exception instanceof EntityNotFoundException)
        throw new NotFoundException(ApiError.LINK_NOT_FOUND);

      throw exception;
    }
  }
}
