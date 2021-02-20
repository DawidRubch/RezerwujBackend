import { checkIfAddressIsInRange } from "../../src/core/helpers/checkIfAddressIsInRange";
import { tRestaurantCeglanaSzczecin } from "../../src/core/TestHelpers/exampleEnteties";
import { ROPLocation } from "../../src/data/models/";

describe("checkifAddressIsInRange", () => {
  test("should return true, distance measured beetween Ceglana in Szczecin and Komenda Wojewódzka Policji.1.35 km", () => {
    let komendaGlownaLocation = new ROPLocation(53.4290228, 14.5589394);
    expect(
      checkIfAddressIsInRange(
        tRestaurantCeglanaSzczecin.location,
        komendaGlownaLocation
      )
    ).toBe(true);
  });
  test("should return false, distance measured beetween Ceglana in Szczecin and Urząd Gminy Police. 14.73 km", () => {
    let urządGminyPoliceLocation = new ROPLocation(53.5507706, 14.5661836);
    expect(
      checkIfAddressIsInRange(
        tRestaurantCeglanaSzczecin.location,
        urządGminyPoliceLocation
      )
    ).toBe(false);
  });
});
