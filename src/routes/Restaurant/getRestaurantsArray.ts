import express from "express";
import { EnviromentType, GetRestaurantsJson } from "../../core/TypeScript";
import { RestaurantOrPub } from "../../data/models/";
import RestaurantPubRepository from "../../domain/repository/Places/RestaurantPubRepository";

const getRestaurantsArrayRouter = express.Router();

getRestaurantsArrayRouter.post("/", async (req, res) => {
  const { bookTime } = req.body;
  const { enviromentType } = req.headers;

  try {
    RestaurantPubRepository.generateArrayOfRestaurantsFromCertainCity(
      bookTime,
      enviromentType as EnviromentType
    ).then((value: RestaurantOrPub[]) =>
      sendStatusBasedOnResFromDb(value, res)
    );
  } catch (err) {
    console.log(err);
  }
});

const sendStatusBasedOnResFromDb = (value: RestaurantOrPub[], res: any) => {
  if (!value) {
    res.sendStatus(404);
    return;
  }
  res.send(value);
};

export default getRestaurantsArrayRouter;
