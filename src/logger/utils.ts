import { readdirSync, statSync } from 'fs';
import { mkdir } from 'fs/promises';
import { access } from 'fs/promises';
import {
  COMMON_LOGS_FILE_NAME_PATTERN,
  ERROR_LOGS_FILE_NAME_PATTERN,
  LOG_FILES_MAX_SIZE,
  PATH_TO_COMMON_LOGS_FOLDER,
  PATH_TO_ERRORS_LOGS_FOLDER,
} from './constants';
import { join } from 'path';

interface IFormattedDateData {
  day: number | string;
  month: number | string;
  year: number;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
}

export const logsFolderAvailabilityCheck = async () => {
  try {
    await access(PATH_TO_COMMON_LOGS_FOLDER);
  } catch (error) {
    await mkdir(PATH_TO_COMMON_LOGS_FOLDER, { recursive: true });
  }
  try {
    await access(PATH_TO_ERRORS_LOGS_FOLDER);
  } catch (error) {
    await mkdir(PATH_TO_ERRORS_LOGS_FOLDER, { recursive: true });
  }
};

export const getFormattedDate = (): IFormattedDateData => {
  const dateData = new Date();
  let day: number | string = dateData.getDay();
  day = day < 10 ? `0${day}` : day;
  let month: number | string = dateData.getMonth();
  month = month < 10 ? `0${month}` : month;
  const year = dateData.getFullYear();
  let hours: number | string = dateData.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes: number | string = dateData.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds: number | string = dateData.getSeconds();
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return {
    day,
    month,
    year,
    hours,
    minutes,
    seconds,
  };
};

export const getLogsFileRotationCount = (type: 'error' | 'log'): number => {
  const pattern =
    type === 'log'
      ? COMMON_LOGS_FILE_NAME_PATTERN
      : ERROR_LOGS_FILE_NAME_PATTERN;
  const path =
    type === 'log' ? PATH_TO_COMMON_LOGS_FOLDER : PATH_TO_ERRORS_LOGS_FOLDER;
  const files = readdirSync(path)
    .filter((fileName) => fileName.match(pattern))
    .sort();
  if (!files.length) return 1;
  const lastLogFileSize = statSync(join(path, files[files.length - 1])).size;
  return lastLogFileSize < LOG_FILES_MAX_SIZE ? files.length : files.length + 1;
};
