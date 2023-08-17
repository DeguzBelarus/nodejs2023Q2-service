import { Module } from '@nestjs/common';

import { LoggingService } from './logger.service';
import { LoggingInterceptor } from './logger.interceptor';

@Module({
  providers: [LoggingService, LoggingInterceptor],
  exports: [LoggingService, LoggingInterceptor],
})
export class LoggingModule {}
