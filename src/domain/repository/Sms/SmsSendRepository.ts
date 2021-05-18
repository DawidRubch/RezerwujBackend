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
      const from = "REZERWUJ";

      //Text to send
      const text = `Stolik na ${hour}:${
        minute === 0 ? "00" : "30"
      } dnia ${day}.${
        month < 10 ? "0" + month : month
      } Ilość osób: ${people}. Proszę na tą wiadomość odpisać 1, jeśli rezerwacja jest możliwa lub 0 jeśli nie jest możliwa. `;

      this.nexmo.message.sendSms(
        from,
        RoPNumber,
        text,
        this.opts,
        (err: MessageError, responseData: any) => {
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
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
}
