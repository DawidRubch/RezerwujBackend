import express from "express";

import { RestaurantPubDb } from "../../data/database/RestaurantPubDataBase";

const router = express.Router();

router.post("/", async ({ body }, res) => {
  const restaurantOrPubDb = new RestaurantPubDb();
  const RoP = await restaurantOrPubDb.getRestaurantOrPubByNameFromDb(body.name);

  if (typeof RoP === "number") {
    res.sendStatus(404);
    return;
  }

  const { image } = RoP;
  res.send({ image, isFree: true });
});

module.exports = router;
