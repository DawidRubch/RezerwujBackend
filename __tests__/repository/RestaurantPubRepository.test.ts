import { BookTime } from "../.././src/data/models/";

import {
  tBookTimeArray,
  tRestaurantCeglanaSzczecin,
  tAlternativeBookTimeArray,
  tAlternativeBookTimeArrayWith2Null,
  tAlternativeBookTimeArrayWith2NullFront,
  tRestaurantPubRepository,
} from "../../src/core/TestHelpers/exampleEnteties";

describe("RestaurantPubRepository", () => {
  describe("generateAlternativeBookingHours", () => {
    test("should return array of 6 alternative booking hours, when closing hours are fine and there are no reservations ", () => {
      //10:30 25 lis 2020 5 osób
      let tBookTime = new BookTime(30, 10, 25, 11, 2020, 5);
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual(tAlternativeBookTimeArray);
    });

    test("should return array of 6 elements, when closing hours are fine and there are some reservations, but there is enough places", () => {
      tRestaurantCeglanaSzczecin.bookTimeArray = [
        //10:30 25 lis 2020 5 osób
        new BookTime(30, 10, 25, 11, 2020, 5),
        //13:00 25 lis 2020 5 osób
        new BookTime(0, 13, 25, 11, 2020, 5),
      ];
      //10:30 25 lis 2020 5 osób
      let tBookTime = new BookTime(30, 10, 25, 11, 2020, 5);
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual(tAlternativeBookTimeArray);
    });

    test("should return array of 4 BookTime and 2 nulls,  when reservation is 2 hours prior last possible reservation, with enough chairs ", () => {
      //20:30 25 lis 2020 5 osób
      let tBookTime = new BookTime(30, 20, 25, 11, 2020, 5);
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual(tAlternativeBookTimeArrayWith2Null);
    });

    test("should return array of 2 nulls and 4 BookTime , when reservation is fine, but first two don't have enough chairs.", () => {
      //15:30 26 lis 2020 25 osób
      let tBookTime = new BookTime(30, 15, 26, 11, 2020, 25);
      tRestaurantCeglanaSzczecin.bookTimeArray = tBookTimeArray;
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual(tAlternativeBookTimeArrayWith2NullFront);
    });

    test("should return an empty array the reservation is on sunday and the restaurant is closed", () => {
      //15:30 8 lis 2020 5 osób
      let tBookTime = new BookTime(30, 15, 8, 11, 2020, 25);
      tRestaurantCeglanaSzczecin.bookTimeArray = tBookTimeArray;
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual([]);
    });
  });
});
