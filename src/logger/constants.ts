import { join } from 'path';

// eslint-disable-next-line prettier/prettier
export const COMMON_LOGS_FILE_NAME_PATTERN = '^common-logs[0-9]\.txt$';
// eslint-disable-next-line prettier/prettier
export const ERROR_LOGS_FILE_NAME_PATTERN = '^errors-logs[0-9]\.txt$';

export const PATH_TO_COMMON_LOGS_FOLDER = join(
  __dirname,
  '../..',
  'logs',
  'common',
);
export const PATH_TO_ERRORS_LOGS_FOLDER = join(
  __dirname,
  '../..',
  'logs',
  'errors',
);
export const COMMON_LOGS_FILENAME = 'common-logs';
export const ERRORS_LOGS_FILENAME = 'errors-logs';
export const LOG_FILES_MAX_SIZE =
  Number(process.env.LOG_FILES_MAX_SIZE) || 100000;
