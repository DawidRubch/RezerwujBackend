/**
   Open and closing hours for every day of the week.
   */
export class DayOfTheWeekOpenHours {
  //Open hours for example 10:00, where 10 is openHour and 00 is openMinute
  openHour: number;
  openMinute: number;
  //Closing hours for example 20:00, where 20 is closingHour and 00 is closingMinute
  closingHour: number;
  closingMinute: number;
  constructor(
    openHour: number,
    openMinute: number,
    closingHour: number,
    closingMinute: number
  ) {
    this.openHour = openHour;
    this.openMinute = openMinute;
    this.closingHour = closingHour;
    this.closingMinute = closingMinute;
  }
}
