import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces";
import SmsSendRepository from "../../domain/repository/Sms/SmsSendRepository";
import express from "express";

const router = express.Router();

router.post(APIURLS.reservation.save, async (req, res) => {
  const smsSendRepository = new SmsSendRepository();

  //If there is no request, sends 400 error
  if (!req) {
    console.log("Hej");
    res.sendStatus(400);
    return;
  }

  const restaurantPubDb: RestaurantPubDb = new RestaurantPubDb();

  let reqBody: ReservationFindNextAvaliableJson = req.body;
  try {
    let bookTimeReq: any = reqBody.bookTime;

    let bookTime: BookTime = new BookTime(
      bookTimeReq.minute,
      bookTimeReq.hour,
      bookTimeReq.day,
      bookTimeReq.month,
      bookTimeReq.year,
      bookTimeReq.people
    );

    bookTime.name = bookTimeReq.name;

    const checkIfDateIsBeforeCurrentDate = isReservationFromPast(bookTime);

    if (checkIfDateIsBeforeCurrentDate) {
      res.sendStatus(400);
      return;
    }

    smsSendRepository.sendSmsToRestaurantManager(
      bookTime,
      "48535480759",
      reqBody.number
    );

    await manageReservation(
      restaurantPubDb.saveReservationToDB(
        bookTime,
        reqBody.name,
        res,
        reqBody.email,
        reqBody.personName,
        reqBody.surName,
        reqBody.number
      )
    );
  } catch (err) {
    console.log(err);
  }
});

router.post(APIURLS.reservation.delete, async (req: any, res: any) => {
  let reqBody: ReservationFindNextAvaliableJson = req.body;
  const restaurantPubDb: RestaurantPubDb = new RestaurantPubDb();

  let bookTimeReq: any = reqBody.bookTime;
  let bookTime: BookTime = new BookTime(
    bookTimeReq.minute,
    bookTimeReq.hour,
    bookTimeReq.day,
    bookTimeReq.month,
    bookTimeReq.year,
    bookTimeReq.people
  );

  bookTime.name = bookTimeReq.name;
  await manageReservation(
    restaurantPubDb.deleteReservationFromDB(bookTime, reqBody.name, res)
  )
    .then(() => console.log("Success"))
    .catch((err) => {
      console.log(err);
    });
});

async function manageReservation(arrayAddOrRemove: Promise<void>) {
  await arrayAddOrRemove;
}

module.exports = router;

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
