import { verifyTimeFormat } from "../../src/core/Verify/verifyTimeFormat";

const completelyWrongFormat = "1312iahjksf klaksf laskhfoasjfp alosifj pl";

describe("verifyDateFormat", () => {
  test("should return true, the formats are matching the desired format of HH:MM", () => {
    const correctDateFormatExamples = ["15:02", "13:12", "08:11", "15:05"];

    for (let time of correctDateFormatExamples) {
      expect(verifyTimeFormat(time)).toBe(true);
    }
  });

  test("should return false, if the format is completly Wrong", () => {
    expect(verifyTimeFormat(completelyWrongFormat)).toEqual(false);
  });

  test("should return false, if the format is correct, but the hour number is not", () => {
    const correctTimeFormatButWrongHourExamples = [
      "25:22",
      "1335d:13",
      "31:58",
      "31:03",
    ];

    for (let time of correctTimeFormatButWrongHourExamples) {
      expect(verifyTimeFormat(time)).toBe(false);
    }
  });
  test("should return false, if the format is correct, but the day is not", () => {
    const correctTimeFormatButWrongMinuteExamples = [
      "20:66",
      "12:133",
      "15:88",
      "12:333",
      "10:3333",
    ];

    for (let time of correctTimeFormatButWrongMinuteExamples) {
      expect(verifyTimeFormat(time)).toBe(false);
    }
  });
});
