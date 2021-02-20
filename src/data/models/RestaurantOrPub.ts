import { BookTime } from "./BookTime";
import { DayOfTheWeekOpenHours } from "./DayOfTheWeek";
import { ROPLocation } from "./Location";

export class RestaurantOrPub {
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  location: ROPLocation;
  distance: number;
  chairs: number;
  menuLink: string;
  bookTimeArray: BookTime[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
  alternativeBookingHours: Array<BookTime | null>;

  constructor(
    name: string,
    type: string,
    //Tags such as 'miła atmosfera' or "dużo opcji wegetariańskich"
    tags: string[],
    shortDescription: string,
    location: ROPLocation,
    //Distance is -1 by default
    chairs: number,
    menuLink: string,
    //All of the reservations
    bookTimeArray: BookTime[],
    //Url to the image
    image: string,
    descriptionPageImg: string,
    //Day of the week is shown by indexes
    //0 is Sunday
    //1 is Monday
    //2 is Tuesday ...
    weekArray: Array<DayOfTheWeekOpenHours | null>
  ) {
    this.descriptionPageImg = descriptionPageImg;
    this.name = name;
    this.type = type;
    this.tags = tags;
    this.shortDescription = shortDescription;
    this.distance = -1;
    this.location = location;
    this.chairs = chairs;
    this.menuLink = menuLink;
    this.bookTimeArray = bookTimeArray;
    this.image = image;
    this.weekArray = weekArray;
    this.alternativeBookingHours = [];
  }
}
//Napisać testy pod t
export function fromJson(restaurantOrPub: RestaurantOrPub): RestaurantOrPub {
  let location: ROPLocation = new ROPLocation(
    restaurantOrPub.location.lat,
    restaurantOrPub.location.long
  );
  let weekArray: Array<DayOfTheWeekOpenHours | null> = restaurantOrPub.weekArray.map(
    mapWeekDay
  );
  let bookTimeArray: BookTime[] = restaurantOrPub.bookTimeArray.map(
    mapBookTime
  );
  let restaurantOrPubEntity = new RestaurantOrPub(
    restaurantOrPub.name,
    restaurantOrPub.type,
    restaurantOrPub.tags,
    restaurantOrPub.shortDescription,
    location,
    restaurantOrPub.chairs,
    restaurantOrPub.menuLink,
    bookTimeArray,
    restaurantOrPub.image,
    restaurantOrPub.descriptionPageImg,
    weekArray
  );
  let alternativeBookingHours = restaurantOrPub.alternativeBookingHours.map(
    mapAlternativeBookingHours
  );

  restaurantOrPubEntity.distance = restaurantOrPub.distance;
  restaurantOrPubEntity.alternativeBookingHours = alternativeBookingHours;
  return restaurantOrPubEntity;
}
function mapBookTime(bookTime: BookTime) {
  let restaurantBookTime = new BookTime(
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

function mapAlternativeBookingHours(bookTimeOrNull: BookTime | null) {
  return bookTimeOrNull === null
    ? null
    : new BookTime(
        bookTimeOrNull.minute,
        bookTimeOrNull.hour,
        bookTimeOrNull.day,
        bookTimeOrNull.month,
        bookTimeOrNull.year,
        bookTimeOrNull.people
      );
}
