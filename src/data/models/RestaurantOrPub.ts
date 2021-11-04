import { Bt } from ".";
import { BookTime } from "./BookTime";
import { DayOfTheWeekOpenHours } from "./DayOfTheWeek";

export class RestaurantOrPub {
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;

  distance: number;
  ownerNumber: string;
  chairs: number;
  menuLink: string;
  bookTimeArray: Bt[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
  alternativeBookingHours: Array<Bt | null | 0> | 0;

  constructor(
    name: string,
    type: string,
    //Tags such as 'miła atmosfera' or "dużo opcji wegetariańskich"
    tags: string[],
    shortDescription: string,

    ownerNumber: string,
    //Distance is -1 by default
    chairs: number,
    menuLink: string,
    //All of the reservations
    bookTimeArray: Bt[],
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
    this.ownerNumber = ownerNumber;
    this.distance = -1;

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
  weekArray,
  bookTimeArray,
  name,
  type,
  tags,
  shortDescription,
  chairs,
  ownerNumber,
  menuLink,
  image,
  descriptionPageImg,
  alternativeBookingHours,
  distance,
}: RestaurantOrPub): RestaurantOrPub {
  const weekArrayToReturn: Array<DayOfTheWeekOpenHours | null> =
    weekArray.map(mapWeekDay);

  const restaurantOrPubEntity = new RestaurantOrPub(
    name,
    type,
    tags,
    shortDescription,

    ownerNumber,
    chairs,
    menuLink,
    bookTimeArray,
    image,
    descriptionPageImg,
    weekArrayToReturn
  );

  const alternativeBookingHoursToReturn =
    alternativeBookingHours === 0
      ? alternativeBookingHours
      : alternativeBookingHours.map(mapAlternativeBookingHours);

  restaurantOrPubEntity.distance = distance;

  restaurantOrPubEntity.alternativeBookingHours =
    alternativeBookingHoursToReturn;

  return restaurantOrPubEntity;
}

function mapWeekDay(weekDay: DayOfTheWeekOpenHours | null) {
  if (weekDay === null) {
    return null;
  }

  const { openHour, openMinute, closingHour, closingMinute } = weekDay;

  return new DayOfTheWeekOpenHours(
    openHour,
    openMinute,
    closingHour,
    closingMinute
  );
}

function mapAlternativeBookingHours(bookTimeOrNull: Bt | null | 0) {
  if (bookTimeOrNull === null) {
    return null;
  }
  if (bookTimeOrNull === 0) {
    return 0;
  }

  return bookTimeOrNull;
}
