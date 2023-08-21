import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap } from 'rxjs';
import { Request, Response } from 'express';

import { LoggingService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const { name } = context.getClass();
    const { getRequest, getResponse } = context.switchToHttp();
    const request = getRequest<Request>();
    const response = getResponse<Response>();

    this.loggingService.logRequest(name, request);
    return next.handle().pipe(
      catchError(async (error) => {
        this.loggingService.logResponse(name, response, undefined, error);
        throw new HttpException(error.message, error.status);
      }),
      tap((responseBody) =>
        this.loggingService.logResponse(name, response, responseBody),
      ),
    );
  }
}
