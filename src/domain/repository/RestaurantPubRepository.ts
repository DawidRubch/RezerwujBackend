import {
  BookTime,
  RestaurantOrPub,
  DayOfTheWeekOpenHours,
  ROPLocation,
} from "../../data/models/";
import { isBookTimeFree } from "../../core/helpers/isBookTimeFree";
import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import {
  calculateDistance,
  checkIfAddressIsInRange,
} from "../../core/helpers/checkIfAddressIsInRange";
import { sortByClosestDistance } from "../../core/SortingFunctions/sortByClosestDistance";
import { sortBookTimes } from "../../core/SortingFunctions/sortBookTimes";
export class RestaurantPubRepository {
  restaurantOrPubDb = new RestaurantPubDb();
  /**
    Function generates the array of all of the restaurants in certain radius.
 */
  async generateArrayOfRestaurantsInRadius(
    searchingAddress: ROPLocation,
    bookTime: BookTime
  ) {
    let placesArr: RestaurantOrPub[] = [];
    //Array of places taken from DB
    const RestaurantOrPubsArray = await this.restaurantOrPubDb.getAllDocuments();

    const restaurantPubRepository = new RestaurantPubRepository();

    //Looping over places
    for (const restaurantOrPub of RestaurantOrPubsArray) {
      let { distance, location, alternativeBookingHours } = restaurantOrPub;
      if (checkIfAddressIsInRange(searchingAddress, location)) {
        distance = calculateDistance(searchingAddress, location);
        //Returns alternative booking array for BookTime

        const alternativeBookingHoursOr0 = restaurantPubRepository.generateAlternativeBookingHours(
          bookTime,
          restaurantOrPub
        );
        if (alternativeBookingHoursOr0 === 0) {
          alternativeBookingHours = 0;
        }
        alternativeBookingHours = alternativeBookingHoursOr0;
        placesArr.push(restaurantOrPub);
      }
    }
    return sortByClosestDistance(placesArr);
  }
  /**
   *The function generates 6 alternative reservation times for a person.
   *
   *Every BookTime is added 30 minutes.

   Returns 0 if 
   */
  generateAlternativeBookingHours(
    bookTime: BookTime,
    restaurantOrPub: RestaurantOrPub
  ): Array<null | BookTime> | 0 {
    let alternativeBookingHoursArray: Array<null | BookTime> = [];
    let restaurantBookTime: BookTime = new BookTime(
      bookTime.minute,
      bookTime.hour,
      bookTime.day,
      bookTime.month,
      bookTime.year,
      bookTime.people
    );
    //Creating the date object
    var d: Date = new Date(
      restaurantBookTime.year,
      restaurantBookTime.month - 1,
      restaurantBookTime.day
    );
    //Checking which day of the week it is
    let dayOfTheWeek: number = d.getDay();

    let dayOpeningHours: DayOfTheWeekOpenHours | null =
      restaurantOrPub.weekArray[dayOfTheWeek];

    //Checking if on the day place is closed
    if (dayOpeningHours === null) {
      return [];
    }
    for (var i = 0; i < 6; i++) {
      checkIfBookTimeViable(
        alternativeBookingHoursArray,
        restaurantBookTime,
        dayOpeningHours,
        restaurantOrPub
      );
    }

    //Loops over the final booking hours array to check if it only has nulls
    //If it does just return 1,
    for (let bookTimeOrNull of alternativeBookingHoursArray) {
      let isArrayOnlyConsintentOfNulls = false;
      if (bookTimeOrNull !== null) {
        isArrayOnlyConsintentOfNulls = true;
        break;
      }
      return 0;
    }

    return alternativeBookingHoursArray;
  }
  //To do
  // async findNextAvialable(bookTime: BookTime, restaurantName: string) {
  //   await this.restaurantOrPubDb
  //.getRestaurantOrPubByNameFromDb(restaurantName)
  //      .then((restaurantOrPub) => {
  //       let bookTimeSortedArray: BookTime[] = sortBookTimes(
  //         restaurantOrPub.bookTimeArray
  //       );
  //});
  // }
}

//Function used inside generateAlternativeBookingHours
//It checks for bookTime being free and if it is free it pushes the bookTime to array
//Else it pushes null
function checkIfBookTimeViable(
  alternativeBookingHoursArray: Array<null | BookTime | 0>,
  restaurantBookTime: BookTime,
  { closingHour, openHour, closingMinute }: DayOfTheWeekOpenHours,
  restaurantOrPub: RestaurantOrPub
) {
  let { minute, hour, day, month, year, people } = restaurantBookTime;

  //If minutes are equal to 60 changes to next hour
  if (minute === 60) {
    hour += 1;
    minute = 0;
  }
  //Checks if the place is closed
  if (hour > closingHour || hour < openHour) {
    alternativeBookingHoursArray.push(0);
  } //Also checks for if the place is closed but in the same hour
  else if (hour === closingHour && minute > closingMinute) {
    alternativeBookingHoursArray.push(0);
  }

  //Checks if the booktime is free
  else if (
    !isBookTimeFree(
      restaurantBookTime,
      restaurantOrPub.bookTimeArray,
      restaurantOrPub
    )
  ) {
    alternativeBookingHoursArray.push(null);
  } else {
    alternativeBookingHoursArray.push(
      new BookTime(minute, hour, day, month, year, people)
    );
  }
  minute += 30;
}
