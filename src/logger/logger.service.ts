import {
  ConsoleLogger,
  Injectable,
  OnModuleInit,
  Scope,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingSaveService } from './logger-save.service';
import { getErrorsToLog } from 'src/utils';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements OnModuleInit {
  constructor(private readonly loggingSaveService: LoggingSaveService) {}

  private readonly logger = new ConsoleLogger();

  onModuleInit() {
    this.logger.setLogLevels(getErrorsToLog());

    process.on('uncaughtException', async (error, origin) => {
      await this.error(
        `Uncaught Exception at: ${origin}, error: ${error.message}`,
      );
    });

    process.on('unhandledRejection', async (reason, promise) => {
      await this.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    });
  }

  setContext(context: string) {
    this.logger.setContext(context);
  }

  async log(message: string) {
    this.logger.log(message);
    await this.loggingSaveService.writeLog(message, 'log');
  }

  async warn(message: string) {
    this.logger.warn(message);
    await this.loggingSaveService.writeLog(message, 'warn');
  }

  async error(message: string) {
    this.logger.error(message);
    await this.loggingSaveService.writeErrorLog(message);
  }

  async debug(message: string) {
    this.logger.debug(message);
    await this.loggingSaveService.writeLog(message, 'debug');
  }

  async verbose(message: string) {
    this.logger.verbose(message);
    await this.loggingSaveService.writeLog(message, 'verbose');
  }

  async logRequest(context: string, request: Request) {
    const { url, query, params, body } = request;
    const requestLogMessage = `[↓ REQUEST DATA ↓]: URL: ${url}, QUERY: ${
      Object.keys(query).length ? JSON.stringify(query) : 'none'
    }, PARAMS: ${
      Object.keys(params).length ? JSON.stringify(params) : 'none'
    }, BODY: ${Object.keys(body).length ? JSON.stringify(body) : 'none'}`;
    this.logger.log(requestLogMessage, context);
    await this.loggingSaveService.writeLog(requestLogMessage, 'request');
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
    await this.loggingSaveService.writeLog(responseLogMessage, 'response');
  }
}
