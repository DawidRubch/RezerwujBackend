/**
 * @returns date string in format DD.MM
 */
export const generateDateFromDayAndMonth = (day: number, month: number) => {
  if (day > 31 || month > 12) return null;

  const DAY = addZeroToNumber(day);
  const MONTH = addZeroToNumber(month);
  return `${DAY}.${MONTH}`;
};

const addZeroToNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);
