import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const { date, time, people, clientNumber } = req.query;

  res.render("index", { date, time, people, clientNumber });
});

module.exports = router;
