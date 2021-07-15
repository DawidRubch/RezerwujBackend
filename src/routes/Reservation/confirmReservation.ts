import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const { date, time, people, clientNumber, additionalInfo } = req.query;

  const additionalInfoToSend = additionalInfo ?? "Brak";

  res.render("index", {
    date,
    time,
    people,
    clientNumber,
    additionalInfo: additionalInfoToSend,
  });
});

export default router;
