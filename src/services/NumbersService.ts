import db from "../config/firebase";
import { ReservationJson } from "../core/TypeScript";
import { Bt } from "../data/models";
import {
  sendSms,
  sendSmsToRestaurantManager,
} from "../middleware/SmsMiddleware";

interface IgetOwnerNumberByRoPName {
  name: string;
}

export const getOwnerNumberByRoPName = async ({
  name,
}: IgetOwnerNumberByRoPName): Promise<string | null> => {
  const { docs } = await db.collection("OwnerNumbers").get();
  for (const doc of docs) {
    if (doc.id === name) return doc.data().ownerNumber;
  }
  return null;
};

/**
 * Function, used to sending SMS to the Restaurant or pub owner to inform him about the new reservation
 * @param bookTime: Reservation date,time, number of people
 * @param bodyRequest: Request from the reservation ENDPOINT,
 *
 */
export const sendSMSToRoPOwner = async (
  bookTime: Bt,
  { name, additionalInfo, number }: ReservationJson
) => {
  //RoP owner number
  const ownerNumber = await getOwnerNumberByRoPName({ name });

  //If number doesnt exists, it contacts my private number to fix it quickly
  if (ownerNumber === null) {
    sendSms({
      text: "Sprawdz ownerNumber w firebase",
      to: "xxx",
      from: "Rezerwuj",
    });
    return;
  }

  const encodedAdditionalInfo = additionalInfo ? encodeURI(additionalInfo) : "";

  // sendSmsToRestaurantManager({
  //   bookTime,
  //   RoPNumber: ownerNumber,
  //   clientNumber: number,
  //   additionalInfo: encodedAdditionalInfo,
  // });
};
