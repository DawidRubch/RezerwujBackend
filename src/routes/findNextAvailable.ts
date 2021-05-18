import { BookTime } from "../data/models/";
import { RestaurantPubRepository } from "../domain/repository/Places/RestaurantPubRepository";
import { ReservationFindNextAvaliableJson } from "../core/Interfaces";
const express = require("express");

const router = express.Router();

//To do
router.post("/", async (req: ReservationFindNextAvaliableJson, res: any) => {
  const restaurantPubRep: RestaurantPubRepository = new RestaurantPubRepository();
  let name: string = req.name;
  let reqBookTime = req.bookTime;
  let bookTime: BookTime = new BookTime(
    reqBookTime.minute,
    reqBookTime.hour,
    reqBookTime.day,
    reqBookTime.month,
    reqBookTime.year,
    reqBookTime.people
  );
  await restaurantPubRep;
  // .findNextAvialable(bookTime, name)
  //.then()
  //   .catch((err) => {
  //console.log(err);
  //   });
  //  res.send("Success");
});

module.exports = router;
