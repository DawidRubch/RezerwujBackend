import { BookTime, RestaurantOrPub, ROPLocation } from "../data/models/";

import { RestaurantPubRepository } from "../domain/repository/RestaurantPubRepository";
import { GetRestaurantsJson } from "../core/Interfaces";
import { DEFAULTADDRESS } from "../core/ImportantVariables/variables";
const express = require("express");

const axios = require("axios");
const router = express.Router();

router.post(
  "/",
  async (
    {
      body: {
        bookTime: { hour, day, month, year, people, minute },
        address,
      },
    }: GetRestaurantsJson,
    res: any
  ) => {
    if (
      !(
        hour.toString() &&
        day.toString() &&
        month.toString() &&
        year.toString() &&
        people.toString()
      )
    ) {
      res.send("Nie uzupelniłeś jakiejś informacji.");
      return;
    } else if (!minute) {
      minute = 0;
    }

    if (!address) {
      address = DEFAULTADDRESS;
    }
    const mappingAddress: string = address.replace(" ", "+");

    let bookTime: BookTime = new BookTime(
      minute,
      hour,
      day,
      month,
      year,
      people
    );

    const path: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${mappingAddress}&key=AIzaSyBeZWYQJ-Wsq7pSs4WUO0Oe2GV6fGUqnzc`;

    await axios
      .get(encodeURI(path))
      .then((result: any) => {
        if (!result.data.results[0]) {
          res.send("Zly adres");
          return;
        }
        try {
          let location = result.data.results[0].geometry.location;
          let ropLocation = new ROPLocation(location.lat, location.lng);
          const restaurantPubRepository = new RestaurantPubRepository();

          restaurantPubRepository
            .generateArrayOfRestaurantsInRadius(ropLocation, bookTime)
            .then((value: RestaurantOrPub[]) => {
              if (!value) {
                res.send("Niestety nie ma żadnych miejsc w okolicy");
              } else {
                res.send(value);
              }
            });
        } catch (err) {
          console.log(err);
        }
      })
      .catch(() => console.log("Coś z api google/getRestaurantsArray.ts"));
  }
);

module.exports = router;
