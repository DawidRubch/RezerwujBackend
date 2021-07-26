import { generateTimeFromMinuteAndHour } from "../../../../src/utils/BookTime/generateTimeFromMinuteAndHour";

describe("generateDateFromDayAndMonth", () => {
  test("should return 15:30, if the hour and minute is correct", () => {
    expect(generateTimeFromMinuteAndHour(15, 30)).toBe("15:30");
  });
  test("should return null if hour is wrong", () => {
    expect(generateTimeFromMinuteAndHour(33, 30)).toBe(null);
  });
  test("should return null if minute is wrong", () => {
    expect(generateTimeFromMinuteAndHour(22, 77)).toBe(null);
  });

  test("should return null if hour and minute are wrong", () => {
    expect(generateTimeFromMinuteAndHour(55, 77)).toBe(null);
  });
});
