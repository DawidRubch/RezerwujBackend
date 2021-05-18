import Nexmo from "nexmo";

export default class SMS {
  nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API as string,
    apiSecret: process.env.NEXMO_API_SECRET as string,
  });
  opts = {
    type: "unicode",
  };
}
