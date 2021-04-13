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
  alternativeBookingHours: Array<BookTime | null | 0> | 0;

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
export function fromJson({
  location,
  weekArray,
  bookTimeArray,
  name,
  type,
  tags,
  shortDescription,
  chairs,
  menuLink,
  image,
  descriptionPageImg,
  alternativeBookingHours,
  distance,
}: RestaurantOrPub): RestaurantOrPub {
  let locationToReturn: ROPLocation = new ROPLocation(
    location.lat,
    location.long
  );
  let weekArrayToReturn: Array<DayOfTheWeekOpenHours | null> = weekArray.map(
    mapWeekDay
  );
  let bookTimeArrayToReturn: BookTime[] = bookTimeArray.map(mapBookTime);
  let restaurantOrPubEntity = new RestaurantOrPub(
    name,
    type,
    tags,
    shortDescription,
    locationToReturn,
    chairs,
    menuLink,
    bookTimeArrayToReturn,
    image,
    descriptionPageImg,
    weekArrayToReturn
  );

  let alternativeBookingHoursToReturn =
    alternativeBookingHours === 0
      ? alternativeBookingHours
      : alternativeBookingHours.map(mapAlternativeBookingHours);

  restaurantOrPubEntity.distance = distance;

  restaurantOrPubEntity.alternativeBookingHours = alternativeBookingHoursToReturn;

  return restaurantOrPubEntity;
}
function mapBookTime({
  minute,
  hour,
  day,
  month,
  year,
  people,
  name,
}: BookTime) {
  let restaurantBookTime = new BookTime(minute, hour, day, month, year, people);
  restaurantBookTime.name = name;
  return restaurantBookTime;
}

function mapWeekDay(weekDay: DayOfTheWeekOpenHours | null) {
  if (weekDay === null) {
    return null;
  }

  let { openHour, openMinute, closingHour, closingMinute } = weekDay;

  return new DayOfTheWeekOpenHours(
    openHour,
    openMinute,
    closingHour,
    closingMinute
  );
}

function mapAlternativeBookingHours(bookTimeOrNull: BookTime | null | 0) {
  if (bookTimeOrNull === null) {
    return null;
  }
  if (bookTimeOrNull === 0) {
    return 0;
  }

  //Descructing bookTime object
  const { minute, hour, day, month, year, people } = bookTimeOrNull;

  return new BookTime(minute, hour, day, month, year, people);
}
