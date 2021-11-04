import { getAttrsFromDateString } from "../../utils/getAttributesFromDatestring";

export type Bt = ReturnType<typeof BookTime>;

export const BookTime = (date: string, people: number) => {
  const { dateString, hour, minutes, month, day, hourString, year } =
    getAttrsFromDateString(date);
  
    return {
    date,
    people,
    hour: +hour,
    minute: +minutes,
    year: +year,
    month: +month,
    day: +day,
    dateString,
    hourString,
  };
};
