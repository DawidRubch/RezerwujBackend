import { generateDateFromDayAndMonth } from "../../../../src/utils/BookTime/generateDateFromDayAndMonth";

describe("generateDateFromDayAndMonth", () => {
  test("should return 25.02, if the day and month is correct", () => {
    expect(generateDateFromDayAndMonth(25, 2)).toBe("25.02");
  });
  test("should return null if day is wrong", () => {
    expect(generateDateFromDayAndMonth(33, 2)).toBe(null);
  });
  test("should return null if month is wrong", () => {
    expect(generateDateFromDayAndMonth(22, 15)).toBe(null);
  });
  test("should return null if hour and minute are wrong", () => {
    expect(generateDateFromDayAndMonth(55, 77)).toBe(null);
  });
});
