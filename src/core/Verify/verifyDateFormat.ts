/**
 * Function used to verify if date passed as a string matches the concrete format
 * @param date format DD.MM
 */
export const verifyDateFormat = (date: string): boolean => {
  //This REGEX has edgecases, to name a few: 25.22,25.255,39.12,
  //Regex should be changed to verify correct date format
  //Currently, these edgecases are handeled manually
  const DATE_VERIFICATION_REGEX = /[0-3][0-9][.][0-1][0-9]/g;

  const didDatePass = DATE_VERIFICATION_REGEX.test(date);

  //Returning false if it didn't passed the initial Regex test
  if (!didDatePass) return false;

  const [day, month] = date.split(".");

  if (+day > 31) return false;
  if (+month > 12) return false;
  return true;
};
