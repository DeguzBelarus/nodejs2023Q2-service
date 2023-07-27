import { config } from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

config();
const PORT = parseInt(process.env.PORT, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
