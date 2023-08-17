interface IFormattedDateData {
  day: number | string;
  month: number | string;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const getFormattedDate = (): IFormattedDateData => {
  const dateData = new Date();
  let day: number | string = dateData.getDay();
  day = day < 10 ? `0${day}` : day;
  let month: number | string = dateData.getMonth();
  month = month < 10 ? `0${month}` : month;
  const year = dateData.getFullYear();
  const hours = dateData.getHours();
  const minutes = dateData.getMinutes();
  const seconds = dateData.getSeconds();
  return {
    day,
    month,
    year,
    hours,
    minutes,
    seconds,
  };
};
