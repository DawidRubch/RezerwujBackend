import {
  BookTime,
  RestaurantOrPub,
  DayOfTheWeekOpenHours,
  ROPLocation,
} from "../../../data/models";

import { RestaurantPubDb } from "../../../data/database/RestaurantPubDataBase";
import {
  calculateDistance,
  checkIfAddressIsInRange,
} from "../../../core/helpers/checkIfAddressIsInRange";
import { sortByClosestDistance } from "../../../core/SortingFunctions/sortByClosestDistance";

export class RestaurantPubRepository {
  restaurantOrPubDb = new RestaurantPubDb();
  /**
    Function generates the array of all of the restaurants in certain radius.
 */
  async generateArrayOfRestaurantsInRadius(
    searchingAddress: ROPLocation,
    bookTime: BookTime
  ) {
    const placesArr: RestaurantOrPub[] = [];
    //Array of places taken from DB
    const RestaurantOrPubsArray =
      await this.restaurantOrPubDb.getAllDocuments();

    //Looping over places
    for (const restaurantOrPub of RestaurantOrPubsArray) {
      //Desctructing variables from restaurantOrPub entity
      let { distance } = restaurantOrPub;
      const { location } = restaurantOrPub;

      //Checks if restaurantis in range
      const isPlaceInRange = checkIfAddressIsInRange(
        searchingAddress,
        location
      );

      if (isPlaceInRange) {
        //Calculates the distance beetween adress and location
        distance = calculateDistance(searchingAddress, location);

        //Returns alternative booking array for BookTime
        const alternativeBookingHoursOr0 = this.generateAlternativeBookingHours(
          bookTime,
          restaurantOrPub
        );

        restaurantOrPub.alternativeBookingHours = alternativeBookingHoursOr0;
        placesArr.push(restaurantOrPub);
      }
    }
    return sortByClosestDistance(placesArr);
  }

  generateArrayOfRestaurantsFromCertainCity = async (bookTime: BookTime) => {
    //Array of places taken from DB
    const RestaurantOrPubsArray =
      await this.restaurantOrPubDb.getAllDocuments();

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

   Returns 0 if 
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
    for (var i = 0; i < 6; i++) {
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
