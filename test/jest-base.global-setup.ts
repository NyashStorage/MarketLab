import { config } from 'dotenv';
import path from 'path';

export default function setup(): void {
  config({
    path: path.join(__dirname, '../.env.testing'),
    override: true,
  });
}
