import express from "express";
import { verifyDateFormat } from "../../core/Verify/verifyDateFormat";
import { verifyTimeFormat } from "../../core/Verify/verifyTimeFormat";

const confirmReservationRouter = express.Router();

confirmReservationRouter.get("/", (req, res) => {
  const { date, time, people, clientNumber, additionalInfo } = req.query;

  const isDateCorrectFormat = verifyDateFormat(date as string);

  const isTimeCorrectFormat = verifyTimeFormat(time as string);

  if (!isDateCorrectFormat || !isTimeCorrectFormat) {
    res.send("<h1>Zły format daty lub czasu rezerwacji</h1>");
    return;
  }

  const additionalInfoToSend = additionalInfo ?? "Brak";

  res.render("index", {
    date,
    time,
    people,
    clientNumber,
    additionalInfo: additionalInfoToSend,
  });
});

export { confirmReservationRouter };
