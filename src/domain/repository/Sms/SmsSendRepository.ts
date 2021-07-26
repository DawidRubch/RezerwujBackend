import { MessageError } from "nexmo";
import { generateRoPMessageText } from "../../../core/helpers/generateRoPMessageText";
import { generatingClientResponseText } from "../../../core/helpers/generatingClientResponseText";
import PhoneNumberValidation from "../../../core/helpers/phoneNumberValidation";
import { CONTACT_NAME } from "../../../core/ImportantVariables/CONTACT_INFO";
import { BookTime } from "../../../data/models";
import SMS from "../../../data/superclasses/Sms";

class SmsSendRepository extends SMS {
  sendSmsToRestaurantManager(
    bookTime: BookTime,
    RoPNumber: string,
    clientNumber: string,
    additionalInfo?: string
  ) {
    try {
      const textInSMS = generateRoPMessageText(
        bookTime,
        clientNumber,
        additionalInfo
      );

      if (PhoneNumberValidation.checkIfNumberIsLegit(clientNumber as string)) {
        this.sendSMS(textInSMS, RoPNumber, CONTACT_NAME);
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
    const isPhoneNumberLegit =
      PhoneNumberValidation.checkIfNumberIsLegit(clientPhoneNumber);

    if (isPhoneNumberLegit) {
      const phoneNumberWithPolishAreaCode =
        PhoneNumberValidation.addPolishAreaCodeToNumber(clientPhoneNumber);

      const responseText = generatingClientResponseText(
        didRestaurantAgreed,
        date,
        time,
        people
      );

      this.sendSMS(responseText, phoneNumberWithPolishAreaCode, CONTACT_NAME);
    }
  };

  sendSMS = (text: string, to: string, from: string) => {
    //Callback executed when SMS is sent
    const sendSMSCallBack = (err: MessageError, responseData: any) => {
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

export default new SmsSendRepository();
