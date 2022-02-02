import { Bt } from "../../data/models";
import { APIURLS } from "../../core/ImportantVariables/ENDPOINT_NAMES";
import express from "express";
import { ReservationJson } from "../../core/TypeScript";
import { sendSMSToRoPOwner } from "../../services/NumbersService";
const reservationHandlerRouter = express.Router();

reservationHandlerRouter.post(APIURLS.reservation.save, async (req, res) => {
  //If there is no request, sends 400 error
  if (!req) {
    res.sendStatus(400);
    return;
  }

  const reqBody: ReservationJson = req.body;
  try {
    const bookTime: Bt = reqBody.bookTime;

    const checkIfDateIsBeforeCurrentDate = isReservationFromPast(bookTime);

    if (checkIfDateIsBeforeCurrentDate) {
      res.sendStatus(400);
      return;
    }

    res.send(200)

    await sendSMSToRoPOwner(bookTime, reqBody);
  } catch (err) {
    console.log(err);
  }
});

//Checks if reservation is created before
const isReservationFromPast = ({ year, month, day }: Bt) => {
  const currentDate = new Date();

  const dateFromBookTime = new Date(year, month, day);

  return currentDate > dateFromBookTime;
};
export { reservationHandlerRouter };
