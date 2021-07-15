import express from "express";

import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";
import { RestaurantPubRepository } from "../../domain/repository/Places/RestaurantPubRepository";

const router = express.Router();

router.post("/", async ({ body }: any, res: any) => {
  const restaurantOrPubDb = new RestaurantPubDb();
  const restaurantPubRepository = new RestaurantPubRepository();
  const bookTimeFromDb = new BookTime(
    body.bookTime.minute,
    body.bookTime.hour,
    body.bookTime.day,
    body.bookTime.month,
    body.bookTime.year,
    body.bookTime.people
  );

  const RoP = await restaurantOrPubDb.getRestaurantOrPubByNameFromDb(
    body.name,
    body.enviromentType
  );

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

export default router;
