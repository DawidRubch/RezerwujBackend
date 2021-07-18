import { verifyDateFormat } from "../../src/core/Verify/verifyDateFormat";

const correctDateFormat = "25.02";

describe("verifyDateFormat", () => {
  test("should return true, the format is 25.02 matching the desired format of DD:MM", () => {
    expect(verifyDateFormat(correctDateFormat)).toEqual(true);
  });
});
