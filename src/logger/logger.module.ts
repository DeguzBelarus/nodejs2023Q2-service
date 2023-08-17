import { Module } from '@nestjs/common';

import { LoggingService } from './logger.service';
import { LoggingInterceptor } from './logger.interceptor';
import { LoggingSaveService } from './logger-save.service';

@Module({
  providers: [LoggingService, LoggingInterceptor, LoggingSaveService],
  exports: [LoggingService, LoggingInterceptor, LoggingSaveService],
})
export class LoggingModule {}
