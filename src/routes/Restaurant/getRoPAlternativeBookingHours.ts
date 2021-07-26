import { BookTime } from "../../data/models";
import RestaurantPubRepository from "../../domain/repository/Places/RestaurantPubRepository";

import express from "express";
import { getRoP } from "../../services/RoP/getRoP";
import { EnviromentType } from "../../core/TypeScript";
const router = express.Router();

interface GetRoPAlternativeBookingHoursReq {
  body: {
    bookTime: BookTime;
    name: string;
    enviromentType: EnviromentType;
  };
}

router.post(
  "/",
  async (
    {
      body: { bookTime, name, enviromentType },
    }: GetRoPAlternativeBookingHoursReq,
    res
  ) => {
    //Getting restaurant or pub from array
    const RoP = await getRoP(name, res, enviromentType);

    if (RoP === null) return;

    const alternativeBookingHours =
      RestaurantPubRepository.generateAlternativeBookingHours(bookTime, RoP);

    res.send(alternativeBookingHours);
  }
);

export default router;
