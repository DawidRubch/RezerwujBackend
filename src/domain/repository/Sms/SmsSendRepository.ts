import { MessageError } from "nexmo";
import { APIURLS } from "../../../core/ImportantVariables/variables";
import { BookTime } from "../../../data/models";
import SMS from "../../../data/superclasses/Sms";

export default class SmsSendRepository extends SMS {
  sendSmsToRestaurantManager(
    { people, hour, minute, day, month }: BookTime,
    RoPNumber: string
  ) {
    try {
      //Contact Name
      let from = process.env.NEXMO_NUMBER;

      //Sets from to REZERWUJ if the number is undefined
      if (!from) from = "REZERWUJ";

      const date = `${day}.${month < 10 ? "0" + month : month}`;

      const time = `${hour}:${minute === 0 ? "00" : "30"}`;

      const serverAddress = `${APIURLS.serverAddress}/confirm-reservation?date=${date}&time=${time}&people=${people}&clientNumber=535480759`;

      const textInSMS = `${serverAddress}`;

      this.sendSMS(textInSMS, RoPNumber, from);
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

    const declineResponseText = `${reservationInfoText}. Niestety została odrzucona.`;

    this.sendSMS(
      didRestaurantAgreed ? confirmResponseText : declineResponseText,
      clientPhoneNumber,
      "REZERWUJ"
    );
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

    this.nexmo.message.sendSms(from, to, text, this.opts, sendSMSCallBack);
  };
}
