import { Bt } from "../data/models";
import { generateDateFromDayAndMonth } from "./BookTime/generateDateFromDayAndMonth";
import { generateTimeFromMinuteAndHour } from "./BookTime/generateTimeFromMinuteAndHour";
import { getAttrsFromDateString } from "./getAttributesFromDatestring";
import { APIURLS } from "../core/ImportantVariables/ENDPOINT_NAMES";

/**
 * Generating text message to send, when someone adds the reservation
 * @returns https://rezerwuj.pl/confirmReservation?date=2020-05-01&time=12:00&people=2&clientNumber=123456789
 */
export const generateRoPMessageText = (
  { date, people }: Bt,
  clientNumber: string,
  additionalInfo?: string
) => {
  const { day, month, hour, minutes } = getAttrsFromDateString(date);

  const DATE = generateDateFromDayAndMonth(day, month);

  const TIME = generateTimeFromMinuteAndHour(hour, minutes);

  //TODO: put these queries in a util function
  const dateQuery = `date=${DATE}`;
  const timeQuery = `&time=${TIME}`;
  const peopleQuery = `&people=${people}`;
  const clientNumberQuery = `&clientNumber=${clientNumber}`;
  const additionalInfoQuery = additionalInfo
    ? `&additionalInfo=${encodeURI(additionalInfo)}`
    : "";

  const queryArguments = `?${dateQuery}${timeQuery}${peopleQuery}${clientNumberQuery}${additionalInfoQuery}`;

  const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

  return `${SERVER_ADDRESS}${APIURLS.confirmReservation}${queryArguments}`;
};
