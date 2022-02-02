import { RestaurantOrPub, Bt } from "../data/models";

import { getAllDocumentsFromACollection } from "../services";
import { EnviromentType } from "../core/TypeScript";
import {
  generateArrayOfAltBookHours,
  getAttrsFromDateString,
  getDayOfTheWeekOrNull,
} from "../utils";

interface IgenerateArrayOfRestaurants {
  enviroment: EnviromentType;
  bookTime: Bt;
  city?: string;
}

export const generateArrayOfRestaurants = async ({
  enviroment,
  bookTime,
  city,
}: IgenerateArrayOfRestaurants): Promise<RestaurantOrPub[]> => {
  const ropArray = await getAllDocumentsFromACollection({
    enviroment,
    city: city || "",
  });

  return ropArray.map((rop) => {
    rop.alternativeBookingHours = generateAlternativeBookingHours({
      bookTime,
      restaurantOrPub: rop,
    });
    return rop;
  });
};

interface IgenerateAlternativeBookingHours {
  bookTime: Bt;
  restaurantOrPub: RestaurantOrPub;
}

export const generateAlternativeBookingHours = ({
  bookTime,
  restaurantOrPub,
}: IgenerateAlternativeBookingHours) => {
  const { year, month, day, date } = getAttrsFromDateString(bookTime.date);

  const dayOpeningHours = getDayOfTheWeekOrNull({
    year,
    month,
    day,
    weekArray: restaurantOrPub.weekArray,
  });

  //Checking if on the day place is closed
  if (dayOpeningHours === null) {
    return [];
  }

  return generateArrayOfAltBookHours({
    initialBookTime: bookTime,
    dayOpeningHours,
    date,
  });
};
