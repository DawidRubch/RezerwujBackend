/**
 * Function used to verify if date passed as a string matches the concrete format
 * @param date format DD:MM
 */
export const verifyDateFormat = (date: string): boolean =>
  /([0-3][0-9][.][0-1][0-9]/g.test(date);
