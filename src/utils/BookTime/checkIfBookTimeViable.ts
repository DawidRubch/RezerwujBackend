//Function used inside generateAlternativeBookingHours
//It checks for bookTime being free and if it is free it pushes the bookTime to array

import { DayOfTheWeekOpenHours } from "types";
import { Bt } from "../../data/models";

//Else it pushes null
export function checkIfBookTimeViable(
  { hour: hours, minute: minutes }: Bt,
  { closingHour, openHour, closingMinute }: DayOfTheWeekOpenHours
) {
  let hour = hours;
  let minute = minutes;

  //Checks if the place is closed
  if (hour > closingHour || hour < openHour) {
    return false;
  } //Also checks for if the place is closed but in the same hour
  if (hour === closingHour && minute > closingMinute) {
    return false;
  }

  return true;
}
