import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

config();

// Подгружаем данные из файла .env с их валидацией.
export const CONFIGURATION = cleanEnv(process.env, {
  API_URL: str({
    desc: 'Ссылка для доступа пользователей',
    default: 'http://localhost:3000',
  }),
  API_PORT: port({
    desc: 'Порт для HTTP сервера',
    default: 3000,
  }),
  APP_NAME: str({
    desc: 'Название приложения для Swagger',
    default: 'MarketLab',
  }),
  APP_VERSION: str({
    desc: 'Версия приложения для Swagger',
    default: '1.0.0',
  }),
  NODE_ENV: str({
    choices: ['development', 'production', 'testing'],
    default: 'production',
  }),

  // Данные базы
  DATABASE_URL: str({
    desc: 'Подключение к базе данных',
    example: 'postgresql://local:password@localhost:5432/marketlab',
    default: 'postgresql://local:password@localhost:5432/marketlab',
  }),

  // Frontend
  CORS_ALLOWED_CLIENT_URLS: str({
    desc: 'Домены, которым разрешён доступ к API',
    example: 'https://nyashmyash99.ru,https://nyashmyash99.dev',
    default: '*',
  }),

  // Docker
  DATABASE_VOLUME: str({
    desc: 'Место хранения данных из базы при запуске через docker compose',
    example: 'D:/Development/Databases/Postgres',
    default: '',
  }),
});
