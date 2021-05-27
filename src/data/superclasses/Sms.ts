import Nexmo from "nexmo";

export default class SMS {
  //API KEYS
  nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API as string,
    apiSecret: process.env.NEXMO_API_SECRET as string,
  });

  //SMS sending options
  opts = {
    type: "unicode",
  };
}
