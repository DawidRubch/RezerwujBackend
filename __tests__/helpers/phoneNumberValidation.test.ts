import PhoneNumberValidation from "../../src/core/helpers/phoneNumberValidation";

const wrongNumberTooManyCharacters = "5534432212";

const wrongNumberContainsSomeLetters = "O9112DDD0";
const wrongNumberContainsFullLetters = "ABCDEFGHI";

const correctNumber = "535480759";

describe("PhoneNumberValidation", () => {
  describe("checkIfNumberIsLegit", () => {
    test("should return false if number has not 9 characters", () => {
      expect(
        PhoneNumberValidation.checkIfNumberIsLegit(wrongNumberTooManyCharacters)
      ).toBeFalsy();
    });
    test("should return false if number has 9 chars, but chars are letters", () => {
      expect(
        PhoneNumberValidation.checkIfNumberIsLegit(
          wrongNumberContainsSomeLetters
        )
      ).toBeFalsy();
      expect(
        PhoneNumberValidation.checkIfNumberIsLegit(
          wrongNumberContainsFullLetters
        )
      ).toBeFalsy();
    });

    test("should return true if number is correct", () => {
      expect(
        PhoneNumberValidation.checkIfNumberIsLegit(correctNumber)
      ).toBeTruthy();
    });
  });
});
