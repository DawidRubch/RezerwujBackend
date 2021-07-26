import { BookTimeJson } from "../../core/TypeScript";

export class BookTime {
  minute: number;
  hour: number;
  year: number;
  day: number;
  month: number;
  people: number;

  constructor(
    minute: number,
    hour: number,
    day: number,
    month: number,
    year: number,
    people: number
  ) {
    this.minute = minute;
    this.hour = hour;
    this.day = day;
    this.month = month;
    this.year = year;
    this.people = people;
  }
  toJson() {
    return {
      minute: this.minute,
      hour: this.hour,
      year: this.year,
      day: this.day,
      month: this.month,
      people: this.people,
    };
  }
}


export const bookTimeFromJson = ({
  minute,
  hour,
  year,
  day,
  month,
  people,
}: BookTimeJson) => new BookTime(minute, hour, day, month, year, people);
