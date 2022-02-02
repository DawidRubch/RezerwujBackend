import express from "express";
import { sendRespondToClient } from "../../middleware/SmsMiddleware";

const clientResponseRouter = express.Router();

const convertIsConfirmedToBoolean = (isConfirmed: any) =>
  isConfirmed.toString() === "true";

clientResponseRouter.get("/", (req) => {
  const { isConfirmed, date, time, people, clientNumber } = req.query;
  const isConfirmedBoolean = convertIsConfirmedToBoolean(isConfirmed);

  sendRespondToClient({
    date: date as string,
    time: time as string,
    people: people as string,
    clientNumber: clientNumber as string,
    didRestaurantAgreed: isConfirmedBoolean,
  });
});
export { clientResponseRouter };
