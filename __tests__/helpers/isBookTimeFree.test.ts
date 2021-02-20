import { isBookTimeFree } from "../../src/core/helpers/isBookTimeFree";
import {
  tBookTimeArray,
  tRestaurantCeglanaSzczecin,
} from "../../src/core/TestHelpers/exampleEnteties";
import { BookTime } from "../../src/data/models";

describe("isBookTimeFree", () => {
  test("should return true, if the next hour is free", () => {
    const tBookTime: BookTime = new BookTime(30, 20, 21, 10, 2020, 5);
    const isBookTimeFreeVar = isBookTimeFree(
      tBookTime,
      tBookTimeArray,
      tRestaurantCeglanaSzczecin
    );
    expect(isBookTimeFreeVar).toBe(true);
  });
  test("should return false, if the hour is free, but the next 30 minutes are booked", () => {
    //15:30 21 October 2020 5 people
    const tBookTime: BookTime = new BookTime(30, 15, 21, 10, 2020, 5);
    const isBookTimeFreeVar = isBookTimeFree(
      tBookTime,
      tBookTimeArray,
      tRestaurantCeglanaSzczecin
    );
    expect(isBookTimeFreeVar).toBe(false);
  });
  test("should return false, if the hour is booked, but the next 30 minutes are free", () => {
    //15:30 21 October 2020 5 people
    const tBookTime: BookTime = new BookTime(30, 15, 21, 10, 2020, 5);
    const isBookTimeFreeVar = isBookTimeFree(
      tBookTime,
      tBookTimeArray,
      tRestaurantCeglanaSzczecin
    );
    expect(isBookTimeFreeVar).toBe(false);
  });
  test("should return true, if the amount if people is equal to the amout of chairs and bookTime is free", () => {
    //18:30 21 October 2020 5 people
    const tBookTime: BookTime = new BookTime(30, 18, 21, 10, 2020, 5);
    const isBookTimeFreeVar = isBookTimeFree(
      tBookTime,
      tBookTimeArray,
      tRestaurantCeglanaSzczecin
    );
    expect(isBookTimeFreeVar).toBe(true);
  });
});
