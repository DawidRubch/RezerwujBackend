import express from "express";
import { BookTime, RestaurantOrPub } from "../../data/models/";
import { RestaurantPubRepository } from "../../domain/repository/Places/RestaurantPubRepository";
import { GetRestaurantsJson } from "../../core/Interfaces";

const router = express.Router();

router.post(
  "/",
  async (
    {
      body: {
        bookTime: { hour, day, month, year, people, minute },
        enviromentType,
      },
    }: GetRestaurantsJson,
    res
  ) => {
    if (
      !(
        hour.toString() &&
        day.toString() &&
        month.toString() &&
        year.toString() &&
        people.toString()
      )
    ) {
      res.send("Nie uzupelniłeś jakiejś informacji.");
      return;
    } else if (!minute) {
      minute = 0;
    }

    const bookTime = new BookTime(minute, hour, day, month, year, people);

    try {
      const restaurantPubRepository = new RestaurantPubRepository();

      restaurantPubRepository
        .generateArrayOfRestaurantsFromCertainCity(bookTime, enviromentType)
        .then((value: RestaurantOrPub[]) => {
          if (!value) {
            res.sendStatus(404);
          } else {
            res.send(value);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
);

export default router;
