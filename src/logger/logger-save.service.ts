import { Injectable, OnModuleInit } from '@nestjs/common';
import { mkdir, appendFile } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';

import { LogSaveType } from 'src/types/types';
import { getFormattedDate } from './utils';

@Injectable()
export class LoggingSaveService implements OnModuleInit {
  private readonly pathToLogsFolder = join(__dirname, '../..', 'logs');
  private readonly pathToCommonLogsFile = join(
    __dirname,
    '../..',
    'logs',
    'common-logs.txt',
  );
  private readonly pathToErrorLogsFile = join(
    __dirname,
    '../..',
    'logs',
    'errors-logs.txt',
  );

  async onModuleInit() {
    try {
      await access(this.pathToLogsFolder);
    } catch (error) {
      mkdir(this.pathToLogsFolder, (error) => {
        error && console.error(error);
      });
    }
  }

  writeLog(log: string, type: LogSaveType) {
    const { day, month, year, hours, minutes, seconds } = getFormattedDate();
    appendFile(
      this.pathToCommonLogsFile,
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [${type.toUpperCase()}]: ${log}\n`,
      (error) => {
        error && console.error(error);
      },
    );
  }

  writeErrorLog(errorLog: string) {
    const { day, month, year, hours, minutes, seconds } = getFormattedDate();
    appendFile(
      this.pathToCommonLogsFile,
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [ERROR]: ${errorLog}\n`,
      (error) => {
        error && console.error(error);
      },
    );
    appendFile(
      this.pathToErrorLogsFile,
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [ERROR]: ${errorLog}\n`,
      (error) => {
        error && console.error(error);
      },
    );
  }
}
