import { BookTime, RestaurantOrPub } from "../../data/models/";
import { RESERVATIONTIMECHECK } from "../../core/ImportantVariables/variables";
const _ = require("lodash");
/**
 Function checks if a certain bookTime is free, 1 hour ahead.
 */
export function isBookTimeFree(
  bookTime: BookTime,
  bookTimeArray: Array<BookTime>,
  restaurantOrPub: RestaurantOrPub
) {
  let rBookTime: BookTime = new BookTime(
    bookTime.minute,
    bookTime.hour,
    bookTime.day,
    bookTime.month,
    bookTime.year,
    bookTime.people
  );

  //The loop will run 2 times, so it will check the table one hour in advance.

  for (var i = 0; i < RESERVATIONTIMECHECK; i++) {
    if (
      howManyChairsTaken(rBookTime, bookTimeArray) + bookTime.people >
      restaurantOrPub.chairs
    ) {
      return false;
    }
    rBookTime.minute += 30;
    if (rBookTime.minute == 60) {
      rBookTime.hour++;
      rBookTime.minute = 0;
    }
  }

  return true;
}

//Compares two booktimes and ignores the amount of people
function compareTwoBookTimes(
  bookTime1: BookTime,
  bookTime2: BookTime
): boolean {
  return _.isEqual(
    bookTimeWithoutPeople(
      bookTime1.minute,
      bookTime1.hour,
      bookTime1.year,
      bookTime1.day,
      bookTime1.month
    ),
    bookTimeWithoutPeople(
      bookTime2.minute,
      bookTime2.hour,
      bookTime2.year,
      bookTime2.day,
      bookTime2.month
    )
  );
}
function bookTimeWithoutPeople(
  minute: number,
  hour: number,
  year: number,
  day: number,
  month: number
) {
  return { minutes: minute, hour, year, day, month };
}
function howManyChairsTaken(
  bookTime: BookTime,
  bookTimeArray: Array<BookTime>
) {
  let chairsCount: number = 0;

  for (const i in bookTimeArray) {
    if (compareTwoBookTimes(bookTimeArray[i], bookTime)) {
      chairsCount += bookTimeArray[i].people;
    }
  }
  return chairsCount;
}
