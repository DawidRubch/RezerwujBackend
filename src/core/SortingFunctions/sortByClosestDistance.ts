import { RestaurantOrPub } from "../../data/models/";
/**
    Function is used to sort the restaurantOrPubArray by the distance
 */
export const sortByClosestDistance = (
  restaurantOrPubArray: RestaurantOrPub[]
): RestaurantOrPub[] => restaurantOrPubArray.sort(compareDistance);

const compareDistance = (a: RestaurantOrPub, b: RestaurantOrPub): number =>
  a.distance > b.distance ? 1 : -1;
