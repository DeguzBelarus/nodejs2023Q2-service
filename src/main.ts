import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/exception.filter';
import { LoggingService } from './logger/logger.service';
import { LoggingSaveService } from './logger/logger-save.service';

const PORT = parseInt(process.env.PORT, 10) || 4000;

(async function () {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new HttpExceptionFilter(new LoggingService(new LoggingSaveService())),
  );
  await app.listen(PORT, () =>
    console.log(`Server has been started on port ${PORT}...`),
  );
})();
