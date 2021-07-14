import { MessageError } from "nexmo";
import PhoneNumberValidation from "../../../core/helpers/phoneNumberValidation";
import { BookTime } from "../../../data/models";
import SMS from "../../../data/superclasses/Sms";

export default class SmsSendRepository extends SMS {
  sendSmsToRestaurantManager(
    { people, hour, minute, day, month }: BookTime,
    RoPNumber: string,
    clientNumber: string,
    additionalInfo?: string
  ) {
    try {
      //Contact Name
      const from = "Rezerwuj";

      const date = `${day}.${month < 10 ? "0" + month : month}`;

      const time = `${hour}:${minute === 0 ? "00" : "30"}`;

      const ENDPOINT_ADDRESS = `${
        process.env.SERVER_ADDRESS
      }/confirm-reservation?date=${date}&time=${time}&people=${people}&clientNumber=${clientNumber}${
        additionalInfo ? "&additionalInfo=" + additionalInfo : ""
      }`;

      const textInSMS = `${ENDPOINT_ADDRESS}`;

      if (PhoneNumberValidation.checkIfNumberIsLegit(clientNumber as string)) {
        this.sendSMS(textInSMS, RoPNumber, from);
        return "Sms sent to the restaurant owner";
      }
      return "Wrong number, sms was not sent";
    } catch (e) {
      console.log(e);
    }
  }

  sendRespondToClient = (
    date: string,
    time: string,
    people: string,
    didRestaurantAgreed: boolean,
    clientPhoneNumber: string
  ) => {
    const reservationInfoText = `Twoja rezerwacja na ${time},data ${date} dla ${people}.`;
    const confirmResponseText = `${reservationInfoText}Została potwierdzona! Bardzo dziękujemy za korzystanie z naszego portalu!`;

    const declineResponseText = `${reservationInfoText} Niestety została odrzucona.`;

    const isPhoneNumberLegit =
      PhoneNumberValidation.checkIfNumberIsLegit(clientPhoneNumber);

    if (isPhoneNumberLegit) {
      const phoneNumberWithPolishAreaCode =
        PhoneNumberValidation.addPolishAreaCodeToNumber(clientPhoneNumber);

      this.sendSMS(
        didRestaurantAgreed ? confirmResponseText : declineResponseText,
        phoneNumberWithPolishAreaCode,
        "REZERWUJ"
      );
    }
  };

  sendSMS = (text: string, to: string, from: string) => {
    //Callback executed when SMS is sent
    const sendSMSCallBack = (err: MessageError, responseData: any) => {
      //TODO
      //Delete all logs here on prod
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]["status"] === "0") {
          console.log("Message sent successfully.");
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]["error-text"]}`
          );
        }
      }
    };
console.log(process.env.NEXMO_API)
    this.nexmo.message.sendSms(from, to, text, this.opts, sendSMSCallBack);
  };
}
