import { DayOfTheWeekOpenHours } from "./DayOfTheWeek";

export class OpenHours {
  //Day of the week is shown by indexes
  //0 is Sunday
  //1 is Monday
  //2 is Tuesday ...
  weekArray: Array<DayOfTheWeekOpenHours | null>;

  constructor(weekArray: Array<DayOfTheWeekOpenHours | null>) {
    this.weekArray = weekArray;
  }
}
