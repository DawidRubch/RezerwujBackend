import { Bt } from "../../data/models";
import { generateDateFromDayAndMonth } from "../../utils/BookTime/generateDateFromDayAndMonth";
import { generateTimeFromMinuteAndHour } from "../../utils/BookTime/generateTimeFromMinuteAndHour";
import { getAttrsFromDateString } from "../../utils/getAttributesFromDatestring";
import { APIURLS } from "../ImportantVariables/ENDPOINT_NAMES";

/**
 * Generating text message to send, when someone adds the reservation
 */
export const generateRoPMessageText = (
  { date, people }: Bt,
  clientNumber: string,
  additionalInfo?: string
) => {
  const { day, month, hour, minutes } = getAttrsFromDateString(date);

  const DATE = generateDateFromDayAndMonth(day, month);

  const TIME = generateTimeFromMinuteAndHour(hour, minutes);

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
