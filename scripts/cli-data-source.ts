import { DataSource } from 'typeorm';
import { OPTIONS } from '../src/infrastructure/database/data-source-options.js';

// Создание DataSource для взаимодействия с TypeORM
// через командную строку, в нашем случае из скриптов package.json.
export default new DataSource(OPTIONS);
