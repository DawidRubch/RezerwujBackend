import Nexmo, { MessageError } from "nexmo";
import { BookTime } from "../../data/models";

export default class SmsSendRepository {
  nexmo = new Nexmo({
    apiKey: "98af1aa8",
    apiSecret: "jpJAcu9436OXPCkw",
  });
  opts = {
    type: "unicode",
  };

  sendSmsToRestaurantManager({ people, hour, minute, day, month }: BookTime) {
    try {
      const from = "Rezerwacja";
      const to = "48535480759";
      const text = `Stolik na ${hour}:${
        minute === 0 ? "00" : "30"
      } dnia ${day}.${month < 10 ? "0" + month : month} Ilość osób: ${people}`;

      this.nexmo.message.sendSms(
        from,
        to,
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
