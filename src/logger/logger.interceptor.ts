import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoggingService } from './logger.service';
import { catchError, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const { name } = context.getClass();
    const { getRequest, getResponse } = context.switchToHttp();
    const request = getRequest();
    const response = getResponse();

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
