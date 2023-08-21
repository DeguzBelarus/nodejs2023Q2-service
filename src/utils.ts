import { LogNotificationType } from './types/types';

const LOGGING_LEVEL = parseInt(process.env.LOGGING_LEVEL, 10);

export const getErrorsToLog = (): Array<LogNotificationType> => {
  switch (LOGGING_LEVEL) {
    case 2:
      return ['log', 'error', 'warn', 'debug', 'verbose'];
    case 1:
      return ['log', 'error', 'warn'];
    case 0:
      return ['log', 'error'];
    default:
      return ['log', 'error', 'warn', 'debug', 'verbose'];
  }
};
