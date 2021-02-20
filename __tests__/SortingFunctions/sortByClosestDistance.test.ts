import { calculateDistance } from "../../src/core/helpers/checkIfAddressIsInRange";
import { sortByClosestDistance } from "../../src/core/SortingFunctions/sortByClosestDistance";
import {
  locationOfPlacRodlaSzczecin,
  restaurantOrPubArrayNotSorted,
  restaurantOrPubArraySorted,
} from "../../src/core/TestHelpers/exampleEnteties";

describe("sortByClosestDistance", () => {
  test("should return sorted by distance RestaurantOrPubArray", () => {
    //Calculate distance is a function used in checkIfAddressIsInRange function, so it is tested.
    for (const restaurantOrPub of restaurantOrPubArraySorted) {
      restaurantOrPub.distance = calculateDistance(
        locationOfPlacRodlaSzczecin,
        restaurantOrPub.location
      );
    }
   
    expect(sortByClosestDistance(restaurantOrPubArrayNotSorted)).toEqual(
      restaurantOrPubArraySorted
    );
  });
});
