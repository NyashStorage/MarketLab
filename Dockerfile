# Получаем используемые переменные.
ARG CI_BUILD_IMAGE="node:23-alpine"
ARG CI_PROJECT_NAME="backend"

# Создаём билдер, чтобы не загружать конечное
# изображением лишними файлами.
FROM ${CI_BUILD_IMAGE} AS builder

# Подтягиваем используемые переменные.
ARG CI_PROJECT_NAME

# Устанавливаем рабочую папку.
WORKDIR /var/www/${CI_PROJECT_NAME}

# Устанавливаем зависимости приложения.
COPY package*.json ./
RUN npm ci

# Копируем файлы приложения.
COPY . .
# Создаём production версию приложения.
RUN npm run build

# Создаём основное изображение
FROM ${CI_BUILD_IMAGE}

# Подтягиваем используемые переменные.
ARG CI_PROJECT_NAME

# Устанавливаем рабочую папку.
WORKDIR /var/www/${CI_PROJECT_NAME}

# Устанавливаем зависимости приложения.
COPY --from=builder /var/www/${CI_PROJECT_NAME}/package*.json ./
RUN npm ci --production

# Описываем порты, на которох запущено приложение.
EXPOSE 3000

# Копируем файлы приложения.
COPY --from=builder /var/www/${CI_PROJECT_NAME}/dist ./dist
# Запускаем приложение.
CMD npm run prod
