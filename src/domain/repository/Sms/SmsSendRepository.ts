import { MessageError } from "nexmo";
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

      //Instructions on how to respond.
      const textOnHowToRespond = `Odpisać 1, jeśli rezerwacja jest możliwa lub 0 jeśli nie jest możliwa.`;

      const textInSMS = `Stolik na ${time}, dnia: ${date}. Ilość osób: ${people}. ${textOnHowToRespond}`;

      this.sendSMS(textInSMS, RoPNumber, from);
    } catch (e) {
      console.log(e);
    }
  }

  sendRespondToClient = (
    { people, hour, minute, day, month }: BookTime,
    respond: 0 | 1
  ) => {};

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
