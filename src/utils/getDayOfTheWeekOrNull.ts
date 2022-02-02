import { DayOfTheWeekOpenHours } from "types";

interface IgetDayOfTheWeekOrNull {
  year: number;
  month: number;
  day: number;
  weekArray: (DayOfTheWeekOpenHours | null)[];
}

export const getDayOfTheWeekOrNull = ({
  year,
  month,
  day,
  weekArray,
}: IgetDayOfTheWeekOrNull) => {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();

  return weekArray[dayOfWeek];
};
