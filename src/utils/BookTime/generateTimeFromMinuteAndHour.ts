/**
 * @returns time string in format HH:MM
 */
export const generateTimeFromMinuteAndHour = (hour: number, minute: number) => {
  if (hour > 24 || minute > 59) return null;

  const HOUR = addZeroToNumber(hour);
  const MINUTE = addZeroToNumber(minute);
  return `${HOUR}:${MINUTE}`;
};

const addZeroToNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);
