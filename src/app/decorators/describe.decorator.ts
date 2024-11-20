import type { HttpStatus, Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseCommonMetadata } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { ApiError } from '../../utils/types/enums/api-error.enum.js';
import { ErrorResponse } from '../dto/responses/error.response.js';

type OkResponseType = {
  description?: string;
  type?: Type<unknown>;
  code?: HttpStatus;
};

type ErrorResponseType = {
  description: ApiError[] | string;
  type?: Type<unknown>;
  code: HttpStatus;
};

/**
 * Документирует эндпоинт при помощи Swagger.
 * @param description - Описание метода (ApiOperation->summary).
 * @param successResponse - Описание ответа метода, если операция прошла успешно (ApiResponse).
 * @param errorResponses - Описание ответов метода, если произошла ошибка (ApiResponse).
 */
export function Describe(
  description: string,
  successResponse?: OkResponseType | string,
  ...errorResponses: ErrorResponseType[]
): ReturnType<typeof applyDecorators> {
  const decorators = [ApiOperation({ summary: description })];

  if (successResponse) {
    const isOnlyDescription = typeof successResponse === 'string';

    decorators.push(
      ApiResponse(
        (isOnlyDescription
          ? {
              description: successResponse,
              status: '2XX',
            }
          : {
              description: successResponse.description,
              type: successResponse.type,
              status: successResponse.code ?? '2XX',
            }) as ApiResponseCommonMetadata,
      ),
    );
  }

  for (const error of errorResponses) {
    decorators.push(
      ApiResponse({
        description: Array.isArray(error.description)
          ? error.description.join(', ')
          : error.description,
        status: error.code,
        type: error.type ?? ErrorResponse,
      }),
    );
  }

  return applyDecorators(...decorators);
}
