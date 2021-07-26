import { monthNameshInPolish } from "../ImportantVariables/POLISH_MONTH_NAMES";

/**
 * Function used to generate text sent back to the client, after the response from RoP owner
 *
 * @param date is format DD.MM.
 * @param time is format HH:MM.
 * @param people is a string, but it represents only the amount of people.
 */
export const generatingClientResponseText = (
  didRestaurantAgreed: boolean,
  date: string,
  time: string,
  people: string
) => {
  const dateFormatted = explainDateInPolishLanguage(date);

  const reservationInfoText = _generateReservationInfoText(
    dateFormatted,
    time,
    people
  );

  const reservationAgreedResponseText =
    "została potwierdzona! Bardzo dziękujemy za skorzystanie z naszych usług :)";

  const reservationDeclinedResponseText =
    "została odrzucona. Zachęcamy do wybrania innego terminu.";

  return didRestaurantAgreed
    ? reservationInfoText + reservationAgreedResponseText
    : reservationInfoText + reservationDeclinedResponseText;
};

//Function takes date with a format DD.MM and changes it to date used in spoken language.
//Example: 15.01 changes to 15 of january, but in polish language.
const explainDateInPolishLanguage = (date: string): string => {
  const [day, month] = date.split(".");

  return `${day} ${monthNameshInPolish[+month - 1]}`;
};

//Function generates the restaurantInfo text
//Translating to english it means "Your reservation on ${date} at ${time} for ${numberOfPeople} people"
const _generateReservationInfoText = (
  formattedDate: string,
  time: string,
  people: string
) =>
  `Twoja rezerwacja na ${formattedDate} o godzinie ${time} dla ${people} osób `;
