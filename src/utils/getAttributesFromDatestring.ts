export const getAttrsFromDateString = (date: string) => {
  const [dateString, hourString] = date.split("T");

  const [year, month, day] = dateString.split("-");

  const [hour, minutes] = hourString.split(":");

  return {
    date,
    dateString,
    hourString,
    year: +year,
    month: +month,
    day: +day,
    hour: +hour,
    minutes: +minutes,
  };
};
