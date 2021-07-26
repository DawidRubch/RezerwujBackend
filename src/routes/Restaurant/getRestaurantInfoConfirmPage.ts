import express from "express";
import { GetRestaurantInfoConfirmPageInterface } from "../../core/TypeScript";

import { getRoP } from "../../services/RoP/getRoP";

const router = express.Router();

const routerCb = async (
  { body }: GetRestaurantInfoConfirmPageInterface,
  res: any
) => {
  const { name, enviromentType } = body;
  const RoP = await getRoP(name, res, enviromentType);

  if (RoP === null) return;

  const { image } = RoP;

  res.send({ image, isFree: true });
};

router.post("/", routerCb);

export default router;
