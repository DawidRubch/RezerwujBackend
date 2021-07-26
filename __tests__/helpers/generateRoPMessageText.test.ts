import { generateRoPMessageText } from "../../src/core/helpers/generateRoPMessageText";
import { BookTime } from "../../src/data/models";

const ENDPOINT_ADDRESS =
  "https://server.rezerwuj.site/confirm-reservation?date=25.03&time=13:30&people=5&clientNumber=48535480759";

const ENDPOINT_ADDRESS_WITH_ADDITIONALINFO =
  ENDPOINT_ADDRESS + "&additionalInfo=Poprosze%20dodatkowe%20informacje";

const bookTime = new BookTime(30, 13, 25, 3, 2020, 5);

const ENV = { SERVER_ADDRESS: "https://server.rezerwuj.site" };

beforeEach(() => {
  process.env = ENV;
});

describe("generateRoPMessageText", () => {
  test("should return right endpoint address with additionalInfo", () => {
    expect(generateRoPMessageText(bookTime, "48535480759", "Poprosze dodatkowe informacje")).toBe(
      ENDPOINT_ADDRESS_WITH_ADDITIONALINFO
    );
  });
  test("should return right endpoint adress without additionalInfo", () => {
    expect(generateRoPMessageText(bookTime, "48535480759")).toBe(
      ENDPOINT_ADDRESS
    );
  });
});
