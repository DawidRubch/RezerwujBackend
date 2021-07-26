import { BookTime } from "../../data/models";
import { generateDateFromDayAndMonth } from "../../utils/BookTime/generateDateFromDayAndMonth";
import { generateTimeFromMinuteAndHour } from "../../utils/BookTime/generateTimeFromMinuteAndHour";
import { APIURLS } from "../ImportantVariables/ENDPOINT_NAMES";

/**
 * Generating text message to send, when someone adds the reservation
 */
export const generateRoPMessageText = (
  { minute, hour, day, month, people }: BookTime,
  clientNumber: string,
  additionalInfo?: string
) => {
  const DATE = generateDateFromDayAndMonth(day, month);

  const TIME = generateTimeFromMinuteAndHour(hour, minute);

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
