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
    const docs = await this.restaurantOrPubDb.getAllDocuments();
    for (const elem of docs) {
      if (checkIfAddressIsInRange(searchingAddress, elem.location)) {
        elem.distance = calculateDistance(searchingAddress, elem.location);
        elem.alternativeBookingHours = new RestaurantPubRepository().generateAlternativeBookingHours(
          bookTime,
          elem
        );

        placesArr.push(elem);
      }
    }
    return Promise.resolve(sortByClosestDistance(placesArr));
  }
  /**
   *The function generates 6 alternative reservation times for a person.
   *
   *Every BookTime is added 30 minutes.
   */
  generateAlternativeBookingHours(
    bookTime: BookTime,
    restaurantOrPub: RestaurantOrPub
  ): Array<null | BookTime> {
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
  alternativeBookingHoursArray: Array<null | BookTime>,
  restaurantBookTime: BookTime,
  dayOpeningHours: DayOfTheWeekOpenHours,
  restaurantOrPub: RestaurantOrPub
) {
  if (restaurantBookTime.minute === 60) {
    restaurantBookTime.hour += 1;
    restaurantBookTime.minute = 0;
  }
  if (
    restaurantBookTime.hour > dayOpeningHours.closingHour ||
    restaurantBookTime.hour < dayOpeningHours.openHour
  ) {
    alternativeBookingHoursArray.push(null);
  } else if (
    restaurantBookTime.hour === dayOpeningHours.closingHour &&
    restaurantBookTime.minute > dayOpeningHours.closingMinute
  ) {
    alternativeBookingHoursArray.push(null);
  } else if (
    !isBookTimeFree(
      restaurantBookTime,
      restaurantOrPub.bookTimeArray,
      restaurantOrPub
    )
  ) {
    alternativeBookingHoursArray.push(null);
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
