import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { APIURLS } from "../../core/ImportantVariables/variables";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces";
import SmsSendRepository from "../../domain/repository/Sms/SmsSendRepository";
import express from "express";
import OwnerNumbersDb from "../../data/database/OwnerNumbersDb";
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

  const reqBody: ReservationFindNextAvaliableJson = req.body;
  try {
    const bookTimeReq = reqBody.bookTime;

    const dateObj = {
      minute: bookTimeReq.minute,
      hour: bookTimeReq.hour,
      day: bookTimeReq.day,
      month: bookTimeReq.year,
      year: bookTimeReq.year,
    };

    const bookTime: BookTime = new BookTime(dateObj, bookTimeReq.people);

    const checkIfDateIsBeforeCurrentDate = isReservationFromPast(bookTime);

    if (checkIfDateIsBeforeCurrentDate) {
      res.sendStatus(400);
      return;
    }

    //RoP owner number
    const ownerNumber = await OwnerNumbersDb.getOwnerNumberByRoPName(
      reqBody.name
    );

    //If number doesnt exists the me
    if (ownerNumber === null) {
      smsSendRepository.sendSMS(
        "Spprawdz ownerNumber w firebase",
        "48535480759",
        "Rezerwuj"
      );
      return;
    }

    smsSendRepository.sendSmsToRestaurantManager(
      bookTime,
      ownerNumber,
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

router.post(APIURLS.reservation.delete, async (req, res) => {
  const reqBody: ReservationFindNextAvaliableJson = req.body;
  const restaurantPubDb: RestaurantPubDb = new RestaurantPubDb();

  const bookTimeReq = reqBody.bookTime;
  const dateObj = {
    minute: bookTimeReq.minute,
    hour: bookTimeReq.hour,
    day: bookTimeReq.day,
    month: bookTimeReq.year,
    year: bookTimeReq.year,
  };

  const bookTime = new BookTime(dateObj, bookTimeReq.people);

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

  dateFromBookTime.setDate(bookTime.date.day);
  dateFromBookTime.setMonth(bookTime.date.month);
  dateFromBookTime.setMinutes(bookTime.date.minute);
  dateFromBookTime.setHours(bookTime.date.hour);
  dateFromBookTime.setFullYear(bookTime.date.year);

  return currentDate > dateFromBookTime;
};
