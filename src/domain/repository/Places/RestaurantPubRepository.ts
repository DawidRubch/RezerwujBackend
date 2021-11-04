import {
  BookTime,
  RestaurantOrPub,
  DayOfTheWeekOpenHours,
  Bt,
} from "../../../data/models";

import RestaurantPubDb from "../../../data/database/RestaurantPubDataBase";
import { EnviromentType } from "../../../core/TypeScript";
import { getAttrsFromDateString } from "../../../utils/getAttributesFromDatestring";

//@todo Refactor this ass
class RestaurantPubRepository {
  generateArrayOfRestaurantsFromCertainCity = async (
    bookTime: Bt,
    enviromentType?: EnviromentType
  ) => {
    //Array of places taken from DB
    const RestaurantOrPubsArray = await RestaurantPubDb.getAllDocuments(
      enviromentType
    );

    for (const restaurantOrPub of RestaurantOrPubsArray) {
      //Returns alternative booking array for BookTime
      const alternativeBookingHoursOr0 = this.generateAlternativeBookingHours(
        bookTime,
        restaurantOrPub
      );

      restaurantOrPub.alternativeBookingHours = alternativeBookingHoursOr0;
    }

    return RestaurantOrPubsArray;
  };
  /**
   *The function generates 6 alternative reservation times for a person.
   *
   *Every BookTime is added 30 minutes.
   */
  generateAlternativeBookingHours(
    bookTime: Bt,
    restaurantOrPub: RestaurantOrPub
  ): Array<null | Bt | 0> | 0 {
    const alternativeBookingHoursArray: Array<null | Bt | 0> = [];

    const {
      minutes: minute,
      year,
      month,
      day,
      hour: hours,
      dateString,
    } = getAttrsFromDateString(bookTime.date);

    //Creating the date object
    const d: Date = new Date(+year, +month, +day);
    //Checking which day of the week it is
    const dayOfTheWeek: number = d.getDay();

    const dayOpeningHours: DayOfTheWeekOpenHours | null =
      restaurantOrPub.weekArray[dayOfTheWeek];

    //Checking if on the day place is closed
    if (dayOpeningHours === null) {
      return [];
    }

    let minutes = minute;
    let hour = +hours;

    for (let i = 0; i < 6; i++) {
      if (minutes === 60) {
        hour += 1;
        minutes = 0;
      }

      let bt = BookTime(
        `${dateString}T${hour}:${!minutes ? "00" : 30}`,
        bookTime.people
      );
      const isBookTimeViable = checkIfBookTimeViable(bt, dayOpeningHours);

      if (isBookTimeViable) {
        alternativeBookingHoursArray.push(bt);
      } else {
        alternativeBookingHoursArray.push(0);
      }

      minutes += 30;
    }

    //Checks if there is something in array that isnt null
    const isSomethingThatIsNotNullInArray = alternativeBookingHoursArray.some(
      (bTOrNull) => bTOrNull !== null
    );

    const isSomethingThatIsNotZeroInArray = alternativeBookingHoursArray.some(
      (bTOrNullOrZeros) => bTOrNullOrZeros !== 0
    );

    if (!isSomethingThatIsNotZeroInArray) {
      return [];
    }

    return isSomethingThatIsNotNullInArray ? alternativeBookingHoursArray : 0;
  }
}

//Function used inside generateAlternativeBookingHours
//It checks for bookTime being free and if it is free it pushes the bookTime to array
//Else it pushes null
function checkIfBookTimeViable(
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

export default new RestaurantPubRepository();
