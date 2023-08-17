interface IFormattedDateData {
  day: number | string;
  month: number | string;
  year: number;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
}

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
