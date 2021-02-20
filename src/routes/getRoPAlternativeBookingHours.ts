import { BookTime, RestaurantOrPub } from "../data/models";
import { RestaurantPubRepository } from "../domain/repository/RestaurantPubRepository";

const express = require("express");
const router = express.Router();

interface GetRoPAlternativeBookingHoursReq {
  body: {
    bookTime: BookTime;
    roP: RestaurantOrPub;
  };
}

router.post(
  "/",
  ({ body: { bookTime, roP } }: GetRoPAlternativeBookingHoursReq, res: any) => {
    let restaurantPubRepository = new RestaurantPubRepository();
    const alternativeBookingHours = restaurantPubRepository.generateAlternativeBookingHours(
      bookTime,
      roP
    );

    res.send(alternativeBookingHours);
  }
);
