import express from "express";
import { isBookTimeFree } from "../../core/helpers/isBookTimeFree";
import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";
import { BookTime } from "../../data/models";

const router = express.Router();

router.post("/", async ({ body }, res: any) => {
  let restaurantOrPubDb = new RestaurantPubDb();
  let RoP = await restaurantOrPubDb.getRestaurantOrPubByNameFromDb(body.name);
  let bookTimeFromDb = new BookTime(
    body.bookTime.minute,
    body.bookTime.hour,
    body.bookTime.day,
    body.bookTime.month,
    body.bookTime.year,
    body.bookTime.people
  );

  if (typeof RoP === "number") {
    res.sendStatus(404);
    return;
  }

  let isFree = isBookTimeFree(bookTimeFromDb, RoP.bookTimeArray, RoP);
  let { image } = RoP;
  res.send({ image, isFree });
});

module.exports = router;
