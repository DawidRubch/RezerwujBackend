import RestaurantPubDb from "../../data/database/RestaurantPubDataBase";
import { BookTime, bookTimeFromJson } from "../../data/models";
import { APIURLS } from "../../core/ImportantVariables/ENDPOINT_NAMES";
import express from "express";
import { sendSMSToRoPOwner } from "../../services/SMS/sendSMSToRoPOwner";
import { BookTimeJson, ReservationJson } from "../../core/TypeScript";
const router = express.Router();

router.post(APIURLS.reservation.save, async (req, res) => {
  //If there is no request, sends 400 error
  if (!req) {
    res.sendStatus(400);
    return;
  }

  const reqBody: ReservationJson = req.body;
  try {
    const bookTimeReq: BookTimeJson = reqBody.bookTime;

    const bookTime: BookTime = bookTimeFromJson(bookTimeReq);

    const checkIfDateIsBeforeCurrentDate = isReservationFromPast(bookTime);

    if (checkIfDateIsBeforeCurrentDate) {
      res.sendStatus(400);
      return;
    }

    await sendSMSToRoPOwner(bookTime, reqBody);

    RestaurantPubDb.saveReservationToDB(bookTime, reqBody, res);
  } catch (err) {
    console.log(err);
  }
});

//Checks if reservation is created before
const isReservationFromPast = (bookTime: BookTime) => {
  const currentDate = new Date();

  const dateFromBookTime = new Date();

  dateFromBookTime.setDate(bookTime.day);
  dateFromBookTime.setMonth(bookTime.month);
  dateFromBookTime.setMinutes(bookTime.minute);
  dateFromBookTime.setHours(bookTime.hour);
  dateFromBookTime.setFullYear(bookTime.year);

  return currentDate > dateFromBookTime;
};
export default router;
