import {
  getAllDocumentsFromACollection,
  getRestaurantNamesFromCollection,
  getRestaurantsDataByTheirNames,
} from "../../services";
import { filterRestaurantsByName } from "../../utils";
import { EnviromentType } from "core/TypeScript";
import express from "express";
import { IncomingHttpHeaders } from "http";
import { generateAlternativeBookingHours } from "../../middleware";
import { BookTime } from "../../data/models";

const getRestaurantsArrayLandingRouter = express.Router();

interface Headers extends IncomingHttpHeaders {
  enviroment: EnviromentType;
  city: string;
}

const getFullRestauransArray = async (
  city: string,
  enviroment: EnviromentType,
  res: express.Response,
  isFilteredArrEmpty: boolean,
  bookTime: { date: string; people: number }
) => {
  const fullRestaurantsArray = await getAllDocumentsFromACollection({
    city,
    enviroment,
  });

  const bt = BookTime(bookTime.date, bookTime.people);

  fullRestaurantsArray.map((restaurant) => {
    restaurant.alternativeBookingHours = generateAlternativeBookingHours({
      bookTime: bt,
      restaurantOrPub: restaurant,
    });
    return restaurant;
  });

  if (isFilteredArrEmpty) {
    return res.status(206).send(fullRestaurantsArray);
  }

  return res.send(fullRestaurantsArray);
};

getRestaurantsArrayLandingRouter.post("/", async (req, res) => {
  const headers = req.headers;
  const { search } = req.query;
  const { bookTime } = req.body;

  const searchStr = search?.toString();

  const { enviroment, city } = headers as Headers;

  if (!city) {
    return res.sendStatus(400);
  }

  const restaurantNames = await getRestaurantNamesFromCollection({
    enviroment,
    city,
  });

  if (!restaurantNames) {
    return res.sendStatus(404);
  }

  if (restaurantNames.length === 0 || !searchStr) {
    return getFullRestauransArray(city, enviroment, res, false, bookTime);
  }

  const filteredRestauratNamesArr = filterRestaurantsByName({
    restaurantNamesArray: restaurantNames,
    search: searchStr,
  });

  if (filteredRestauratNamesArr.length === 0) {
    return getFullRestauransArray(city, enviroment, res, true, bookTime);
  }

  const restaurants = await getRestaurantsDataByTheirNames({
    city,
    enviroment,
    restaurantNames: filteredRestauratNamesArr,
  });

  for (let restaurant of restaurants) {
    restaurant.alternativeBookingHours = generateAlternativeBookingHours({
      bookTime,
      restaurantOrPub: restaurant,
    });
  }

  return res.send(restaurants);
});

export { getRestaurantsArrayLandingRouter };
