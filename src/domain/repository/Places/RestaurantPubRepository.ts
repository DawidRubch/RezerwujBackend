import {
  BookTime,
  RestaurantOrPub,
  DayOfTheWeekOpenHours,
} from "../../../data/models";

import RestaurantPubDb from "../../../data/database/RestaurantPubDataBase";
import { EnviromentType } from "../../../core/TypeScript";

class RestaurantPubRepository {
  generateArrayOfRestaurantsFromCertainCity = async (
    bookTime: BookTime,
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
    bookTime: BookTime,
    restaurantOrPub: RestaurantOrPub
  ): Array<null | BookTime | 0> | 0 {
    const alternativeBookingHoursArray: Array<null | BookTime | 0> = [];
    const restaurantBookTime: BookTime = new BookTime(
      bookTime.minute,
      bookTime.hour,
      bookTime.day,
      bookTime.month,
      bookTime.year,
      bookTime.people
    );
    //Creating the date object
    const d: Date = new Date(
      restaurantBookTime.year,
      restaurantBookTime.month - 1,
      restaurantBookTime.day
    );
    //Checking which day of the week it is
    const dayOfTheWeek: number = d.getDay();

    const dayOpeningHours: DayOfTheWeekOpenHours | null =
      restaurantOrPub.weekArray[dayOfTheWeek];

    //Checking if on the day place is closed
    if (dayOpeningHours === null) {
      return [];
    }
    for (let i = 0; i < 6; i++) {
      checkIfBookTimeViable(
        alternativeBookingHoursArray,
        restaurantBookTime,
        dayOpeningHours
      );
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
  alternativeBookingHoursArray: Array<null | BookTime | 0>,
  restaurantBookTime: BookTime,
  { closingHour, openHour, closingMinute }: DayOfTheWeekOpenHours
) {
  //If minutes are equal to 60 changes to next hour
  if (restaurantBookTime.minute === 60) {
    restaurantBookTime.hour += 1;
    restaurantBookTime.minute = 0;
  }
  //Checks if the place is closed
  if (
    restaurantBookTime.hour > closingHour ||
    restaurantBookTime.hour < openHour
  ) {
    alternativeBookingHoursArray.push(0);
  } //Also checks for if the place is closed but in the same hour
  else if (
    restaurantBookTime.hour === closingHour &&
    restaurantBookTime.minute > closingMinute
  ) {
    alternativeBookingHoursArray.push(0);
  } else {
    alternativeBookingHoursArray.push(
      new BookTime(
        restaurantBookTime.minute,
        restaurantBookTime.hour,
        restaurantBookTime.day,
        restaurantBookTime.month,
        restaurantBookTime.year,
        restaurantBookTime.people
      )
    );
  }
  restaurantBookTime.minute += 30;
}

export default new RestaurantPubRepository();
