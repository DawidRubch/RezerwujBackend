/**
 * Function used to verify if time passed as a string matches the concrete format
 * @param time format DD:MM
 */
export const verifyTimeFormat = (time: string): boolean => {
  //This REGEX has edgecases, to name a few: 25.22,25.255,39.12,
  //Regex should be changed to verify correct date format
  //Currently, these edgecases are handeled manually
  const TIME_VERIFICATION_REGEX = /[0-2][0-9][:][0-5][0-9]/g;

  const didTimePass = TIME_VERIFICATION_REGEX.test(time);

  //Returning false if it didn't passed the initial Regex test
  if (!didTimePass) return false;

  const [hour, minute] = time.split(":");
  if (+hour > 24) return false;
  if (+minute > 59) return false;
  return true;
};
