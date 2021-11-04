import { ReservationJson } from "../../core/TypeScript";
import OwnerNumbersDb from "../../data/database/OwnerNumbersDb";
import { BookTime, Bt } from "../../data/models";
import SmsSendRepository from "../../domain/repository/Sms/SmsSendRepository";

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
  const ownerNumber = await OwnerNumbersDb.getOwnerNumberByRoPName(name);

  //If number doesnt exists, it contacts my private number to fix it quickly
  if (ownerNumber === null) {
    SmsSendRepository.sendSMS(
      "Spprawdz ownerNumber w firebase",
      "48535480759",
      "Rezerwuj"
    );
    return;
  }

  const encodedAdditionalInfo = additionalInfo ? encodeURI(additionalInfo) : "";

  SmsSendRepository.sendSmsToRestaurantManager(
    bookTime,
    ownerNumber,
    number,
    encodedAdditionalInfo
  );
};
