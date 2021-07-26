//Here are the details about the reservation
const reservationTimeInfo =
  "Twoja rezerwacja na 15 października o godzinie 15:30 dla 12 osób ";

const positiveClientResponseText =
  reservationTimeInfo +
  "została potwierdzona! Bardzo dziękujemy za skorzystanie z naszych usług :)";

  const negativeClientResponseText = reservationTimeInfo + "została odrzucona. Zachęcamy do wybrania innego terminu."

import { generatingClientResponseText } from "../../src/core/helpers/generatingClientResponseText";

describe("generatingClientResponseText", () => {
  test("should return positive response after the restaurant confirmed the reservation", () => {
    const responseSentToClient = generatingClientResponseText(
      true,
      "15.10",
      "15:30",
      "12"
    );

    expect(responseSentToClient).toBe(positiveClientResponseText);
  });

  test("should return negative response after the restaurant confirmed the reservation", () => {
    const responseSentToClient = generatingClientResponseText(
      false,
      "15.10",
      "15:30",
      "12"
    );

    expect(responseSentToClient).toBe(negativeClientResponseText);
  });
});
