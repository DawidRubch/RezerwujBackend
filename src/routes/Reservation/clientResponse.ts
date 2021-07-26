import express from "express";
import SmsSendRepository from "../../domain/repository/Sms/SmsSendRepository";

const router = express.Router();

const convertIsConfirmedToBoolean = (isConfirmed: any) =>
  isConfirmed.toString() === "true" ? true : false;

router.get("/", (req) => {

  const { isConfirmed, date, time, people, clientNumber } = req.query;
  const isConfirmedBoolean = convertIsConfirmedToBoolean(isConfirmed);

  SmsSendRepository.sendRespondToClient(
    date as string,
    time as string,
    people as string,
    isConfirmedBoolean,
    clientNumber as string
  );
});
export default router;
