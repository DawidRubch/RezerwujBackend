import express from "express";
import { EnviromentType, GetRestaurantsJson } from "../../core/TypeScript";
import { RestaurantOrPub } from "../../data/models/";
import { generateArrayOfRestaurants } from "../../middleware/RestaurantMiddleware";

const getRestaurantsArrayRouter = express.Router();

getRestaurantsArrayRouter.post("/", async (req, res) => {
  const { bookTime } = req.body;
  const { enviroment, city } = req.headers;


  try {
    generateArrayOfRestaurants({
      bookTime,
      enviroment: enviroment as EnviromentType,
      city: city as string,
    }).then((value: RestaurantOrPub[]) =>
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
