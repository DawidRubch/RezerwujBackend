import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { APIURLS } from "../../core/ImportantVariables/ENDPOINT_NAMES";
import { ReservationFindNextAvaliableJson } from "../../core/Interfaces";
import SmsSendRepository from "../../domain/repository/Sms/SmsSendRepository";
import express from "express";
import OwnerNumbersDb from "../../data/database/OwnerNumbersDb";
const router = express.Router();

router.post(APIURLS.reservation.save, async (req, res) => {
  const smsSendRepository = new SmsSendRepository();

  //If there is no request, sends 400 error
  if (!req) {
    res.sendStatus(400);
    return;
  }

  const restaurantPubDb: RestaurantPubDb = new RestaurantPubDb();

  const reqBody: ReservationFindNextAvaliableJson = req.body;
  try {
    const bookTimeReq = reqBody.bookTime;

    const bookTime: BookTime = new BookTime(
      bookTimeReq.minute,
      bookTimeReq.hour,
      bookTimeReq.day,
      bookTimeReq.month,
      bookTimeReq.year,
      bookTimeReq.people
    );

    const checkIfDateIsBeforeCurrentDate = isReservationFromPast(bookTime);

    if (checkIfDateIsBeforeCurrentDate) {
      res.sendStatus(400);
      return;
    }

    //RoP owner number
    const ownerNumber = await OwnerNumbersDb.getOwnerNumberByRoPName(
      reqBody.name
    );

    //If number doesnt exists, it contacts my private number to fix it quickly
    if (ownerNumber === null) {
      smsSendRepository.sendSMS(
        "Spprawdz ownerNumber w firebase",
        "48535480759",
        "Rezerwuj"
      );
      return;
    }

    const additionalInfo = reqBody.additionalInfo
      ? encodeURI(reqBody.additionalInfo)
      : "";

    smsSendRepository.sendSmsToRestaurantManager(
      bookTime,
      ownerNumber,
      reqBody.number,
      additionalInfo
    );

    await manageReservation(
      restaurantPubDb.saveReservationToDB(
        bookTime,
        reqBody.enviromentType,
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
  const bookTime = new BookTime(
    bookTimeReq.minute,
    bookTimeReq.hour,
    bookTimeReq.day,
    bookTimeReq.month,
    bookTimeReq.year,
    bookTimeReq.people
  );

  await manageReservation(
    restaurantPubDb.deleteReservationFromDB(
      bookTime,
      reqBody.enviromentType,
      reqBody.name,
      res
    )
  )
    .then(() => console.log("Success"))
    .catch((err) => {
      console.log(err);
    });
});

async function manageReservation(arrayAddOrRemove: Promise<void>) {
  await arrayAddOrRemove;
}

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
