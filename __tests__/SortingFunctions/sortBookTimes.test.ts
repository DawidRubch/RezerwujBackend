import { sortBookTimes } from "../../src/core/SortingFunctions/sortBookTimes";
import {
  bookTimeArrayNotSorted,
  bookTimeArraySorted,
} from "../../src/core/TestHelpers/exampleEnteties";
describe("sortBookTimes", () => {
  test("should return sorted BookTimesArray", () => {
    expect(sortBookTimes(bookTimeArrayNotSorted)).toEqual(bookTimeArraySorted);
  });
});
