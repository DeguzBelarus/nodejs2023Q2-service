import {
  ConsoleLogger,
  Injectable,
  OnModuleInit,
  Scope,
  HttpException,
} from '@nestjs/common';

import { getErrorsToLog } from 'src/utils';
import { Request, Response } from 'express';
import { LoggingSaveService } from './logger-save.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements OnModuleInit {
  constructor(private readonly loggingSaveService: LoggingSaveService) {}

  private readonly logger = new ConsoleLogger();

  onModuleInit() {
    this.logger.setLogLevels(getErrorsToLog());
  }

  setContext(context: string) {
    this.logger.setContext(context);
  }

  log(message: string) {
    this.logger.log(message);
    this.loggingSaveService.writeLog(message, 'log');
  }

  warn(message: string) {
    this.logger.warn(message);
    this.loggingSaveService.writeLog(message, 'warn');
  }

  error(message: string) {
    this.logger.error(message);
    this.loggingSaveService.writeErrorLog(message);
  }

  debug(message: string) {
    this.logger.debug(message);
    this.loggingSaveService.writeLog(message, 'debug');
  }

  verbose(message: string) {
    this.logger.verbose(message);
    this.loggingSaveService.writeLog(message, 'verbose');
  }

  logRequest(context: string, request: Request) {
    const { url, query, params, body } = request;
    const requestLogMessage = `[↓ REQUEST DATA ↓]: URL: ${url}, QUERY: ${
      Object.keys(query).length ? JSON.stringify(query) : 'none'
    }, PARAMS: ${
      Object.keys(params).length ? JSON.stringify(params) : 'none'
    }, BODY: ${Object.keys(body).length ? JSON.stringify(body) : 'none'}`;
    this.logger.log(requestLogMessage, context);
    this.loggingSaveService.writeLog(requestLogMessage, 'request');
  }

  async logResponse(
    context: string,
    response: Response,
    body: unknown,
    error?: HttpException,
  ) {
    const { statusCode } = response;
    const responseLogMessage = `[↑ RESPONSE DATA ↑]: STATUS CODE: ${
      error ? error?.getStatus() : statusCode
    }, ${error?.message ? 'ERROR MESSAGE' : 'BODY'}: ${
      error
        ? error.message
        : body && Object.keys(body)?.length
        ? JSON.stringify(body)
        : 'none'
    }`;
    this.logger.log(responseLogMessage, context);
    this.loggingSaveService.writeLog(responseLogMessage, 'response');
  }
}
