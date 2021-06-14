import {
  BookTime,
  DayOfTheWeekOpenHours,
  ROPLocation,
  RestaurantOrPub,
} from "../../data/models/";
import { RoPFromFirebase } from "../Interfaces/RoPFromFirebase";

/**
Function maps data from the database to the RestaurantOrPubArray
 */
//TODO Add interface to data from backend
export function mappingDataFromDb(
  data: RoPFromFirebase,
  restaurantOrPubArr: RestaurantOrPub[]
) {
  const location: ROPLocation = new ROPLocation(
    data.location.lat,
    data.location.long
  );
  const weekArray: Array<DayOfTheWeekOpenHours | null> = data.weekArray;
  const bookTimeArray: BookTime[] = data.bookTimeArray;

  restaurantOrPubArr.push(
    new RestaurantOrPub(
      data.name,
      data.type,
      data.tags,
      data.shortDescription,
      location,
      data.ownerNumber,
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
