import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = parseInt(process.env.PORT, 10) || 4000;

(async function () {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}...`),
  );
})();
