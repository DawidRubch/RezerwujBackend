import { BookTime } from "../../data/models";
import RestaurantPubRepository from "../../domain/repository/Places/RestaurantPubRepository";

import express from "express";
import { getRoP } from "../../services/RoP/getRoP";
import { EnviromentType } from "../../core/TypeScript";
const getRopRouter = express.Router();

getRopRouter.post("/", async (req, res) => {
  const { enviromentType } = req.headers;

  const { name, bookTime } = req.body;

  //Getting restaurant or pub from array
  const RoP = await getRoP(name, res, enviromentType as EnviromentType);

  if (RoP === null) return;

  const alternativeBookingHours =
    RestaurantPubRepository.generateAlternativeBookingHours(bookTime, RoP);

  res.send(alternativeBookingHours);
});

export { getRopRouter };
