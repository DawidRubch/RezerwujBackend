import express from "express";

import { RestaurantPubDb } from "../data/database/RestaurantPubDataBase";
import { BookTime } from "../data/models";
import { RestaurantPubRepository } from "../domain/repository/RestaurantPubRepository";

const router = express.Router();

router.post("/", async ({ body }: any, res: any) => {

  let restaurantOrPubDb = new RestaurantPubDb();
  let restaurantPubRepository = new RestaurantPubRepository();
  let bookTimeFromDb = new BookTime(
    body.bookTime.minute,
    body.bookTime.hour,
    body.bookTime.day,
    body.bookTime.month,
    body.bookTime.year,
    body.bookTime.people
  );

  let RoP = await restaurantOrPubDb.getRestaurantOrPubByNameFromDb(body.name);

  if (typeof RoP === "number") {
    return res.status(400).send('Restauracja o podanej nazwie nie istnieje!');
  }
  let alternativeBookingHours = restaurantPubRepository.generateAlternativeBookingHours(
    bookTimeFromDb,
    RoP
  );
  let {
    descriptionPageImg,
    name,
    type,
    tags,
    shortDescription,
    menuLink,
  } = RoP;


  res.send({
    descriptionPageImg,
    name,
    type,
    tags,
    shortDescription,
    menuLink,
    alternativeBookingHours,
  });
});

module.exports = router;
