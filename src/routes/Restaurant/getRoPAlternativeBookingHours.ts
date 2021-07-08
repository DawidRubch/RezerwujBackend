import { EnviromentType } from "../../core/Types/EnviromentType";
import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { RestaurantPubRepository } from "../../domain/repository/Places/RestaurantPubRepository";

const express = require("express");
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
    res: any
  ) => {
    const restaurantPubRepository = new RestaurantPubRepository();

    const restaurantPubDb = new RestaurantPubDb();

    //Getting restaurant or pub from array
    const roP = await restaurantPubDb.getRestaurantOrPubByNameFromDb(
      name,
      enviromentType
    );

    if (typeof roP === "number") {
      res.sendStatus(404);
      return;
    }

    const alternativeBookingHours =
      restaurantPubRepository.generateAlternativeBookingHours(bookTime, roP);

    res.send(alternativeBookingHours);
  }
);

module.exports = router;
