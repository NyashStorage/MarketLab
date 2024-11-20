import 'reflect-metadata';
import { ALL_MODULES, PUBLIC_MODULES } from './app/app.module.js';
import type { INestApplication } from '@nestjs/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CONFIGURATION } from './config/configuration.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { isDevelopmentMode } from './helpers/development.helper.js';

export async function bootstrap(
  appPromise: Promise<INestApplication>,
): Promise<void> {
  const logger = new Logger('Main');

  try {
    // Подготавливаем модули и сервисы.
    const app = await appPromise;

    // Настраиваем CORS.
    app.enableCors({
      origin: CONFIGURATION.CORS_ALLOWED_CLIENT_URLS.split(','),
      credentials: true,
    });

    // Настраиваем Swagger.
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(CONFIGURATION.APP_NAME)
        .setVersion(CONFIGURATION.APP_VERSION)
        .addBearerAuth()
        .build(),
      {
        include: isDevelopmentMode() ? ALL_MODULES : PUBLIC_MODULES,
      },
    );

    SwaggerModule.setup('docs', app, document);

    // Настраиваем валидацию.
    app.useGlobalPipes(
      new ValidationPipe({
        // Преобразовывает plain object в типизированный объект.
        transform: true,
        // Не засчитывает поля запроса, у которых нет декоратора проверки.
        whitelist: true,
      }),
    );

    // Запускаем приложение.
    const port: number = CONFIGURATION.API_PORT;
    await app.listen(port, '0.0.0.0');

    logger.log(`HTTP сервер запущен на порту ${port.toString()}.`);
  } catch (exception: unknown) {
    if (!(exception instanceof Error))
      return logger.error('Что-то пошло не так при запуске приложения.');

    logger.error(
      `Что-то пошло не так при запуске приложения: ${exception.message}.`,
      exception.stack,
    );
  }
}
