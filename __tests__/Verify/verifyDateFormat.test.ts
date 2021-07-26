import { verifyDateFormat } from "../../src/core/Verify/verifyDateFormat";

const completelyWrongFormat = "12oijfasnfaskl;kda/sdakmlfa";

describe("verifyDateFormat", () => {
  test("should return true, the examples are matching the desired format of DD.MM", () => {
    const correctDateFormatExamples = ["25.02", "13.12", "31.11", "30.05"];

    for (let date of correctDateFormatExamples) {
      expect(verifyDateFormat(date)).toBe(true);
    }
  });

  test("should return false, if the format is completlyWrong", () => {
    expect(verifyDateFormat(completelyWrongFormat)).toEqual(false);
  });

  test("should return false, if the format is correct, but the month number is not", () => {
    const correctDateFormatButWrongMonthExamples = [
      "25.22",
      "13.13",
      "31.078",
      "31.033331",
    ];

    for (let date of correctDateFormatButWrongMonthExamples) {
      expect(verifyDateFormat(date)).toBe(false);
    }
  });
  test("should return false, if the format is correct, but the day is not", () => {
    const correctDateFormatButWrongDaysExamples = [
      "33.10",
      "125512451.13",
      "sie.08",
      "dre.03333",
      "55.03321fs",
    ];

    for (let date of correctDateFormatButWrongDaysExamples) {
      expect(verifyDateFormat(date)).toBe(false);
    }
  });
});
