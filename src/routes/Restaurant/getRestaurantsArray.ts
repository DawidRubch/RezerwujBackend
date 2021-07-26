import express from "express";
import { GetRestaurantsJson } from "../../core/TypeScript";
import { bookTimeFromJson, RestaurantOrPub } from "../../data/models/";
import RestaurantPubRepository from "../../domain/repository/Places/RestaurantPubRepository";

const router = express.Router();

router.post(
  "/",
  async ({ body: { bookTime, enviromentType } }: GetRestaurantsJson, res) => {
    const bookTimeFromJs = bookTimeFromJson(bookTime);

    try {
      RestaurantPubRepository.generateArrayOfRestaurantsFromCertainCity(
        bookTimeFromJs,
        enviromentType
      ).then((value: RestaurantOrPub[]) =>
        sendStatusBasedOnResFromDb(value, res)
      );
    } catch (err) {
      console.log(err);
    }
  }
);

const sendStatusBasedOnResFromDb = (value: RestaurantOrPub[], res: any) => {
  if (!value) {
    res.sendStatus(404);
    return;
  }
  res.send(value);
};

export default router;
