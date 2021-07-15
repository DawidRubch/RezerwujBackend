import {
  BookTime,
  DayOfTheWeekOpenHours,
  RestaurantOrPub,
} from "../../data/models/";
import { RoPFromFirebase } from "../Interfaces/RoPFromFirebase";

/**
Function maps data from the database to the RestaurantOrPubArray
 */

export function mappingDataFromDb(
  data: RoPFromFirebase,
  restaurantOrPubArr: RestaurantOrPub[]
) {
  const weekArray: Array<DayOfTheWeekOpenHours | null> = data.weekArray;
  const bookTimeArray: BookTime[] = data.bookTimeArray;

  return new RestaurantOrPub(
    data.name,
    data.type,
    data.tags,
    data.shortDescription,
    data.ownerNumber,
    data.chairs,
    data.menuLink,
    bookTimeArray,
    data.image,
    data.descriptionPageImg,
    weekArray
  );
}
