import {
  ConsoleLogger,
  Injectable,
  OnModuleInit,
  Scope,
  HttpException,
} from '@nestjs/common';

import { getErrorsToLog } from 'src/utils';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements OnModuleInit {
  private readonly logger = new ConsoleLogger();

  onModuleInit() {
    this.logger.setLogLevels(getErrorsToLog());
  }

  setContext(context: string) {
    this.logger.setContext(context);
  }

  log(message: string) {
    this.logger.log(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  logRequest(context: string, request: Request) {
    const { url, query, params, body } = request;
    this.logger.log(
      `[REQUEST DATA]: URL: ${url}, QUERY: ${
        Object.keys(query).length ? JSON.stringify(query) : 'none'
      }, PARAMS: ${
        Object.keys(params).length ? JSON.stringify(params) : 'none'
      }, BODY: ${Object.keys(body).length ? JSON.stringify(body) : 'none'}`,
      context,
    );
  }

  async logResponse(
    context: string,
    response: Response,
    body: unknown,
    error?: HttpException,
  ) {
    const { statusCode } = response;
    this.logger.log(
      `[RESPONSE DATA]: STATUS CODE: ${
        error ? error.getStatus() : statusCode
      }, ${error?.message ? 'ERROR MESSAGE' : 'BODY'}: ${
        error
          ? error.message
          : body && Object.keys(body)?.length
          ? JSON.stringify(body)
          : 'none'
      }`,
      context,
    );
  }
}
