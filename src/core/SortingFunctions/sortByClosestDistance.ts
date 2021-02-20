import { RestaurantOrPub } from "../../data/models/";
/**
    Function is used to sort the restaurantOrPubArray by the distance
 */
export function sortByClosestDistance(
  restaurantOrPubArray: RestaurantOrPub[]
): RestaurantOrPub[] {
  return restaurantOrPubArray.sort(compareDistance);
}

function compareDistance(a: RestaurantOrPub, b: RestaurantOrPub): number {
  if (a.distance > b.distance) {
    return 1;
  } else if (b.distance > a.distance) {
    return -1;
  }
  return 0;
}
