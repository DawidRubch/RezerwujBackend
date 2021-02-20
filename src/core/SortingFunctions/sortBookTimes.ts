import { BookTime } from "../../data/models/";

export function sortBookTimes(bookTimesArray: BookTime[]) {
  return bookTimesArray.sort(compareBookTimes);
}

function compareBookTimes(a: BookTime, b: BookTime) {
  if (a.year > b.year) {
    return 1;
  } else if (a.year === b.year) {
    if (a.month > b.month) {
      return 1;
    } else if (a.month < b.month) {
      return -1;
    } else {
      if (a.day > b.day) {
        return 1;
      } else if (a.day < b.day) {
        return -1;
      } else {
        if (a.hour > b.hour) {
          return 1;
        } else if (a.hour < b.hour) {
          return -1;
        } else {
          if (a.minute > b.minute) {
            return 1;
          } else if (a.minute < b.minute) {
            return -1;
          }
        }
      }
    }
  } else if (a.year < b.year) {
    return -1;
  }
  return 0;
}
