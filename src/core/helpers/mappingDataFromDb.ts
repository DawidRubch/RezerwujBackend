import {
  BookTime,
  DayOfTheWeekOpenHours,
  ROPLocation,
  RestaurantOrPub,
} from "../../data/models/";

/**
Function maps data from the database to the RestaurantOrPubArray
 */
export function mappingDataFromDb(
  data: any,
  restaurantOrPubArr: RestaurantOrPub[]
) {
  const location: ROPLocation = new ROPLocation(
    data.location.lat,
    data.location.long
  );
  const weekArray: Array<DayOfTheWeekOpenHours | null> = data.weekArray.map(
    mapWeekDay
  );
  const bookTimeArray: BookTime[] = data.bookTimeArray.map(mapBookTime);

  restaurantOrPubArr.push(
    new RestaurantOrPub(
      data.name,
      data.type,
      data.tags,
      data.shortDescription,
      location,
      data.chairs,
      data.menuLink,
      bookTimeArray,
      data.image,
      data.descriptionPageImg,
      weekArray
    )
  );

  return restaurantOrPubArr;
}

function mapBookTime(bookTime: BookTime) {
  const restaurantBookTime = new BookTime(
    bookTime.minute,
    bookTime.hour,
    bookTime.day,
    bookTime.month,
    bookTime.year,
    bookTime.people
  );
  restaurantBookTime.name = bookTime.name;
  return restaurantBookTime;
}

function mapWeekDay(weekDay: DayOfTheWeekOpenHours | null) {
  return weekDay === null
    ? null
    : new DayOfTheWeekOpenHours(
        weekDay.openHour,
        weekDay.openMinute,
        weekDay.closingHour,
        weekDay.closingMinute
      );
}
