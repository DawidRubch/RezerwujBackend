import { generateAlternativeBookingHours } from "../../middleware/RestaurantMiddleware";
import express from "express";
import { EnviromentType } from "../../core/TypeScript";
import { getRoP } from "../../services/RestaurantPubService";

const getRopRouter = express.Router();

getRopRouter.post("/", async (req, res) => {
  const { enviromentType } = req.headers;

  //TODO: convert name to be a parameter in path
  const { name, bookTime } = req.body;

  //Getting restaurant or pub from array
  const restaurantOrPub = await getRoP(
    name,
    res,
    enviromentType as EnviromentType
  );

  if (restaurantOrPub === null) {
    res.sendStatus(404);
  } else {
    const alternativeBookingHours = generateAlternativeBookingHours({
      bookTime,
      restaurantOrPub,
    });

    res.send(alternativeBookingHours);
  }
});

export { getRopRouter };
