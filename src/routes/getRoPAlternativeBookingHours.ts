import { RestaurantPubDb } from "../data/database/RestaurantPubDataBase";
import { BookTime } from "../data/models";
import { RestaurantPubRepository } from "../domain/repository/RestaurantPubRepository";

const express = require("express");
const router = express.Router();

interface GetRoPAlternativeBookingHoursReq {
  body: {
    bookTime: BookTime;
    name: string;
  };
}

router.post(
  "/",
  async (
    { body: { bookTime, name } }: GetRoPAlternativeBookingHoursReq,
    res: any
  ) => {
    let restaurantPubRepository = new RestaurantPubRepository();
    let restaurantPubDb = new RestaurantPubDb();
    let roP = await restaurantPubDb.getRestaurantOrPubByNameFromDb(name);
    const alternativeBookingHours = restaurantPubRepository.generateAlternativeBookingHours(
      bookTime,
      roP
    );

    res.send(alternativeBookingHours);
  }
);

module.exports = router;
