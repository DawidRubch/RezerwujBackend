import express from "express";
import { EnviromentType } from "../../core/TypeScript";
import { getRoP } from "../../services/RoP/getRoP";

const getRestaurantRouter = express.Router();

getRestaurantRouter.post("/:restaurantName", async (req, res) => {
  const { restaurantName } = req.params;
  const { enviromentType } = req.headers;

  const RoPOrNull = await getRoP(
    restaurantName,
    res,
    enviromentType as EnviromentType
  );

  if (!RoPOrNull) return;

  res.send(RoPOrNull);
});

export { getRestaurantRouter };
