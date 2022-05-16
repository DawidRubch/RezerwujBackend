import Nexmo, { MessageError } from "nexmo";
import { generateRoPMessageText } from "../utils/generateRoPMessageText";
import { generatingClientResponseText } from "../utils/generatingClientResponseText";
import PhoneNumberValidation from "../utils/phoneNumberValidation";
import { CONTACT_NAME } from "../core/ImportantVariables/CONTACT_INFO";
import { Bt as BookTime } from "../data/models";

interface IsendSmsToRestaurantManager {
  bookTime: BookTime;
  RoPNumber: string;
  clientNumber: string;
  additionalInfo?: string;
}

export const sendSmsToRestaurantManager = async ({
  bookTime,
  RoPNumber,
  clientNumber,
  additionalInfo,
}: IsendSmsToRestaurantManager) => {
  try {
    const textInSMS = generateRoPMessageText(
      bookTime,
      clientNumber,
      additionalInfo
    );

    if (PhoneNumberValidation.checkIfNumberIsLegit(clientNumber as string)) {
      sendSms({ text: textInSMS, to: RoPNumber, from: CONTACT_NAME });
      return "Sms sent to the restaurant owner";
    }
    return "Wrong number, sms was not sent";
  } catch (e) {
    console.log(e);
  }
};

interface IsendRespondToClient {
  date: string;
  time: string;
  people: string;
  didRestaurantAgreed: boolean;
  clientNumber: string;
}

export const sendRespondToClient = ({
  date,
  time,
  people,
  didRestaurantAgreed,
  clientNumber,
}: IsendRespondToClient) => {
  try {
    if (PhoneNumberValidation.checkIfNumberIsLegit(clientNumber as string)) {
      //Adding polish area code
      const clientNumberWithAreaCode = "48" + clientNumber;

      const textInSMS = generatingClientResponseText(
        didRestaurantAgreed,
        date,
        time,
        people
      );

      sendSms({
        text: textInSMS,
        to: clientNumberWithAreaCode,
        from: CONTACT_NAME,
      });
      return "Sms sent to the client";
    }
    return "Wrong number, sms was not sent";
  } catch (e) {
    console.log(e);
  }
};

interface IsendSMS {
  text: string;
  to: string;
  from: string;
}

export const sendSms = ({ text, to, from }: IsendSMS) => {
  const sendSMSCallback = (err: MessageError, responseData: any) => {
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

  const opts = {
    //Required to send polish characters
    type: "unicode",
  };

  const NEXMO = new Nexmo({
    apiKey: process.env.NEXMO_API as string,
    apiSecret: process.env.NEXMO_API_SECRET as string,
  });

  NEXMO.message.sendSms(from, to, text, opts, sendSMSCallback);
};
