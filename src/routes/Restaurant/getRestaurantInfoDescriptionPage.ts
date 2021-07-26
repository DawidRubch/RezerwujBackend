import express from "express";
import { GetRestaurantInfoDescriptionInterface } from "../../core/TypeScript";

import { bookTimeFromJson } from "../../data/models";
import RestaurantPubRepository from "../../domain/repository/Places/RestaurantPubRepository";
import { getRoP } from "../../services/RoP/getRoP";

const router = express.Router();

router.post(
  "/",
  async ({ body }: GetRestaurantInfoDescriptionInterface, res: any) => {
    const { bookTime, enviromentType, name } = body;

    const bookTimeFromDb = bookTimeFromJson(bookTime);

    const RoP = await getRoP(name, res, enviromentType);
    if (RoP === null) return;

    const alternativeBookingHours =
      RestaurantPubRepository.generateAlternativeBookingHours(
        bookTimeFromDb,
        RoP
      );

    const { descriptionPageImg, type, tags, shortDescription, menuLink } = RoP;

    res.send({
      descriptionPageImg,
      name: RoP.name,
      type,
      tags,
      shortDescription,
      menuLink,
      alternativeBookingHours,
    });
  }
);

export default router;
