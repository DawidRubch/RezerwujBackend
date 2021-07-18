import express from "express";

import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { RestaurantPubRepository } from "../../domain/repository/Places/RestaurantPubRepository";

const router = express.Router();

router.post("/", async ({ body }: any, res: any) => {
  const restaurantOrPubDb = new RestaurantPubDb();
  const restaurantPubRepository = new RestaurantPubRepository();
  const dateObj = {
    minute: body.bookTime.minute,
    hour: body.bookTime.hour,
    day: body.bookTime.day,
    month: body.bookTime.month,
    year: body.bookTime.year,
  };
  const bookTimeFromDb = new BookTime(dateObj, body.bookTime.people);

  const RoP = await restaurantOrPubDb.getRestaurantOrPubByNameFromDb(body.name);

  if (typeof RoP === "number") {
    return res.status(400).send("Restauracja o podanej nazwie nie istnieje!");
  }
  const alternativeBookingHours =
    restaurantPubRepository.generateAlternativeBookingHours(
      bookTimeFromDb,
      RoP
    );
  const { descriptionPageImg, name, type, tags, shortDescription, menuLink } =
    RoP;

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
