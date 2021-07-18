import { BookTime } from "../.././src/data/models/";

import {
  tBookTimeArray,
  tRestaurantCeglanaSzczecin,
  tAlternativeBookTimeArray,
  tAlternativeBookTimeArrayWith2Zeros,
  tAlternativeBookTimeArrayWith2NullFront,
  tRestaurantPubRepository,
  tFullBookedArray,
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

    test("should return array of 4 BookTime and 2 zeros,  when reservation is 2 hours prior last possible reservation, with enough chairs ", () => {
      //20:30 25 lis 2020 5 osób
      let tBookTime = new BookTime(30, 20, 25, 11, 2020, 5);
      expect(
        tRestaurantPubRepository.generateAlternativeBookingHours(
          tBookTime,
          tRestaurantCeglanaSzczecin
        )
      ).toEqual(tAlternativeBookTimeArrayWith2Zeros);
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

    test("should return an empty array the reservation is on monday, but after the restaurant is closed", () => {
      //22:30 8 lis 2020 5 osób
      let tBookTime = new BookTime(30, 22, 9, 11, 2020, 25);
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
