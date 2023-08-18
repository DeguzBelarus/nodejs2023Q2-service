import { Injectable, OnModuleInit } from '@nestjs/common';
import { appendFileSync } from 'fs';
import { join } from 'path';

import { LogSaveType } from 'src/types/types';
import {
  getFormattedDate,
  getLogsFileRotationID,
  logsFolderAvailabilityCheck,
} from './utils';
import {
  COMMON_LOGS_FILENAME,
  ERRORS_LOGS_FILENAME,
  PATH_TO_COMMON_LOGS_FOLDER,
  PATH_TO_ERRORS_LOGS_FOLDER,
} from './constants';

@Injectable()
export class LoggingSaveService implements OnModuleInit {
  async onModuleInit() {
    await logsFolderAvailabilityCheck();
  }

  async writeLog(log: string, type: LogSaveType) {
    await logsFolderAvailabilityCheck();
    const { day, month, year, hours, minutes, seconds } = getFormattedDate();
    const logsRotation = getLogsFileRotationID('log');
    const logFileName = `${COMMON_LOGS_FILENAME}${logsRotation}.txt`;
    appendFileSync(
      join(PATH_TO_COMMON_LOGS_FOLDER, logFileName),
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [${type.toUpperCase()}]: ${log}\n`,
    );
  }

  async writeErrorLog(errorLog: string) {
    await logsFolderAvailabilityCheck();
    const { day, month, year, hours, minutes, seconds } = getFormattedDate();
    const logsRotation = getLogsFileRotationID('log');
    const logFileName = `${COMMON_LOGS_FILENAME}${logsRotation}.txt`;
    const errorsRotation = getLogsFileRotationID('error');
    const errorFileName = `${ERRORS_LOGS_FILENAME}${errorsRotation}.txt`;
    appendFileSync(
      join(PATH_TO_COMMON_LOGS_FOLDER, logFileName),
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [ERROR]: ${errorLog}\n`,
    );
    appendFileSync(
      join(PATH_TO_ERRORS_LOGS_FOLDER, errorFileName),
      `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} - [ERROR]: ${errorLog}\n`,
    );
  }
}
