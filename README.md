## Подготовка к запуску

### 1. Указать переменные окружения
Все возможные значения располагаются в файле [`./src/config/configuration.ts`](./src/config/configuration.ts) 
с подробным описанием каждой переменной.

### 2. Запустить базу данных
```bash
docker compose up -d postgres
```

### 3. Применить миграции
```bash
npm install
npm run migration:run
```

### 4. Запустить тестирование
```bash
npm run test:unit
npm run test:e2e
```

Для обработки передаётся `.env.testing`, рекомендуется запускать на отдельной базе данных.

~~По хорошему, здесь нужно автоматически запускать отдельную базу для тестирования и работать с ней,
но в рамках тестового задания пойдёт¹.~~

## Запуск приложения

### 1. Посредствам Docker Compose
```bash
docker compose up -d backend
```

### 2. Посредствам Docker
```bash
docker build \
  --build-arg CI_BUILD_IMAGE=node:23-alpine \
  --build-arg CI_PROJECT_NAME=backend \
  -t marketlab.backend:latest .

docker run \
  --name marketlab.backend \
  -p 3000:3000 \
  --restart unless-stopped \
  -d marketlab.backend:latest
```

Где `CI_BUILD_IMAGE` и `CI_PROJECT_NAME` необязательные аргументы,
имеющие стандартные значения аналогичные представленным в команде.

### 3. Посредствам NodeJS
```bash
npm install
npm run build
npm run prod
```

## Полезные моменты

[`http://localhost:3000/docs`](http://localhost:3000/docs) - стандартная ссылка на Swagger документацию.

[`./postman`](./postman) - коллекции и переменные окружения для Postman.