import express from "express";
import { EnviromentType } from "../../core/TypeScript";
import { getRoP } from "../../services/RestaurantPubService";

const getRestaurantRouter = express.Router();

//TODO: change method to get
getRestaurantRouter.post("/:restaurantName", async (req, res) => {
  const { restaurantName } = req.params;
  const { enviromentType } = req.headers;

  const RoPOrNull = await getRoP(
    restaurantName,
    res,
    enviromentType as EnviromentType
  );

  if (!RoPOrNull) {
    res.send(404);
    return;
  }

  res.send(RoPOrNull);
});

export { getRestaurantRouter };
