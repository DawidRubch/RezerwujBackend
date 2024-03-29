import {
  BookTime,
  DayOfTheWeekOpenHours,
  RestaurantOrPub,
} from "../../data/models/";
import RestaurantPubRepository from "../../middleware/RestaurantMiddleware";
const weekArray = [
  null,
  new DayOfTheWeekOpenHours(10, 0, 22, 0),
  new DayOfTheWeekOpenHours(10, 0, 22, 0),
  new DayOfTheWeekOpenHours(10, 0, 22, 0),
  new DayOfTheWeekOpenHours(10, 0, 22, 0),
  new DayOfTheWeekOpenHours(10, 0, 22, 0),
  new DayOfTheWeekOpenHours(11, 0, 18, 0),
];

export const tBookTimeArray = [
  //18:30 21 October 2020 25 people
  new BookTime(30, 18, 21, 10, 2020, 25),
  //16:00 21 October 2020 30 people
  new BookTime(0, 16, 21, 10, 2020, 30),
  //15:30 25 lis 2020 3 osob
  new BookTime(30, 15, 25, 11, 2020, 3),
  //15:30 25 lis 2020 3 osob
  new BookTime(30, 15, 25, 11, 2020, 3),
  //16:00 25 lis 2020 6 osob
  new BookTime(0, 16, 25, 11, 2020, 6),
  //16:00 25 lis 2020 6 osob
  new BookTime(0, 16, 25, 11, 2020, 6),
  //16:00 26 lis 2020 6 osob
  new BookTime(0, 16, 25, 11, 2020, 6),
  //13:00 28 lis 2020 6 osob
  new BookTime(0, 13, 28, 11, 2020, 6),
  //15:30 10 lis 2020 6 osob
  new BookTime(30, 15, 10, 11, 2020, 6),
  //17:00 12 list 2021 6 osob
  new BookTime(0, 17, 12, 11, 2020, 6),
  //15:30 26 list 2020 6 osob
  new BookTime(30, 15, 26, 11, 2020, 6),
  //16:00 26 list 2020 6 osob
  new BookTime(0, 16, 26, 11, 2020, 6),
];

export const tFullBookedArray = [
  //18:30 21 October 2020 15 people
  new BookTime(30, 18, 21, 10, 2020, 15),
  //18:30 21 October 2020 16 people
  new BookTime(30, 18, 21, 10, 2020, 16),
  //19:00 21 October 2020 15 people
  new BookTime(0, 19, 21, 10, 2020, 15),
  //19:00 21 October 2020 16 people
  new BookTime(0, 19, 21, 10, 2020, 16),
  //19:30 21 October 2020 15 people
  new BookTime(30, 19, 21, 10, 2020, 15),
  //19:30 21 October 2020 16 people
  new BookTime(30, 19, 21, 10, 2020, 16),
  //20:00 21 October 2020 15 people
  new BookTime(0, 20, 21, 10, 2020, 15),
  //20:00 21 October 2020 16 people
  new BookTime(0, 20, 21, 10, 2020, 16),
  //20:30 21 October 2020 15 people
  new BookTime(30, 20, 21, 10, 2020, 15),
  //20:30 21 October 2020 16 people
  new BookTime(30, 20, 21, 10, 2020, 16),
  //21:00 21 October 2020 15 people
  new BookTime(0, 21, 21, 10, 2020, 15),
  //21:00 21 October 2020 16 people
  new BookTime(0, 21, 21, 10, 2020, 16),
];
export const tRestaurantCeglanaSzczecin = new RestaurantOrPub(
  "Ceglana",
  "włoska",
  ["mila"],
  "Siema jestem adam",
  "535480759",
  30,
  "youtube.com",
  tBookTimeArray,
  "",
  "descriptionPageImg",
  weekArray
);

export const tAlternativeBookTimeArray = [
  //10:30 25 lis 2020 5 osob
  new BookTime(30, 10, 25, 11, 2020, 5),
  //11:00 25 lis 2020 5 osob
  new BookTime(0, 11, 25, 11, 2020, 5),
  //11:30 25 lis 2020 5 osob
  new BookTime(30, 11, 25, 11, 2020, 5),
  //12:00 25 lis 2020 5 osob
  new BookTime(0, 12, 25, 11, 2020, 5),
  //12:30 25 lis 2020 5 osob
  new BookTime(30, 12, 25, 11, 2020, 5),
  //13:00 25 lis 2020 5 osob
  new BookTime(0, 13, 25, 11, 2020, 5),
];

export const tAlternativeBookTimeArrayWith2Zeros = [
  //20:30 25 lis 2020 5 osob
  new BookTime(30, 20, 25, 11, 2020, 5),
  //21:00 25 lis 2020 5 osob
  new BookTime(0, 21, 25, 11, 2020, 5),
  //21:30 25 lis 2020 5 osob
  new BookTime(30, 21, 25, 11, 2020, 5),
  //22:00 25 lis 2020 5 osob
  new BookTime(0, 22, 25, 11, 2020, 5),
  0,
  0,
];
export const tAlternativeBookTimeArrayWith2NullFront = [
  null,
  null,
  //16:30 25 lis 2020 25 osob
  new BookTime(30, 16, 26, 11, 2020, 25),
  //17:00 25 lis 2020 25 osob
  new BookTime(0, 17, 26, 11, 2020, 25),
  //17:30 25 lis 2020 25 osob
  new BookTime(30, 17, 26, 11, 2020, 25),
  //18:00 25 lis 2020 25 osob
  new BookTime(0, 18, 26, 11, 2020, 25),
];

export const bookTimeArrayNotSorted = [
  //16:30 25 lis 2020 25 osob
  new BookTime(30, 16, 26, 11, 2020, 25),
  //17:00 26 lis 2020 25 osob
  new BookTime(0, 17, 26, 11, 2020, 25),
  //17:30 26 lis 2020 25 osob
  new BookTime(30, 17, 26, 11, 2020, 25),
  //18:00 25 lis 2020 25 osob
  new BookTime(0, 18, 26, 11, 2020, 25),
  //10:30 25 lis 2020 5 osob
  new BookTime(30, 10, 25, 11, 2020, 5),
  //11:00 25 lis 2020 5 osob
  new BookTime(0, 11, 25, 11, 2020, 5),
  //11:30 25 lis 2020 5 osob
  new BookTime(30, 11, 25, 11, 2020, 5),
  //12:00 25 lis 2020 5 osob
  new BookTime(0, 12, 25, 11, 2020, 5),
  //12:30 25 lis 2020 5 osob
  new BookTime(30, 12, 25, 11, 2020, 5),
  //13:00 25 lis 2020 5 osob
  new BookTime(0, 13, 25, 11, 2020, 5),
  //13:00 25 lis 2019 5 osob
  new BookTime(0, 13, 25, 11, 2019, 5),
  //13:00 25 lis 2020 5 osob
  new BookTime(0, 13, 25, 11, 2020, 5),
  //13:00 25 grud 2020 5 osob
  new BookTime(0, 13, 25, 12, 2020, 5),
];
export const bookTimeArraySorted = [
  //13:00 25 lis 2019 5 osob
  new BookTime(0, 13, 25, 11, 2019, 5),
  //10:30 25 lis 2020 5 osob
  new BookTime(30, 10, 25, 11, 2020, 5),
  //11:00 25 lis 2020 5 osob
  new BookTime(0, 11, 25, 11, 2020, 5),
  //11:30 25 lis 2020 5 osob
  new BookTime(30, 11, 25, 11, 2020, 5),
  //12:00 25 lis 2020 5 osob
  new BookTime(0, 12, 25, 11, 2020, 5),
  //12:30 25 lis 2020 5 osob
  new BookTime(30, 12, 25, 11, 2020, 5),
  //13:00 25 lis 2020 5 osob
  new BookTime(0, 13, 25, 11, 2020, 5),
  //13:00 25 lis 2020 5 osob
  new BookTime(0, 13, 25, 11, 2020, 5),
  //16:30 25 lis 2020 25 osob
  new BookTime(30, 16, 26, 11, 2020, 25),
  //17:00 26 lis 2020 25 osob
  new BookTime(0, 17, 26, 11, 2020, 25),
  //17:30 26 lis 2020 25 osob
  new BookTime(30, 17, 26, 11, 2020, 25),
  //18:00 25 lis 2020 25 osob
  new BookTime(0, 18, 26, 11, 2020, 25),
  //13:00 25 grud 2020 5 osob
  new BookTime(0, 13, 25, 12, 2020, 5),
];
//Plac rodla - Ceglana around 1.49 km
//Plac rodla - Ładoga around 1.05 km
//Plac Rodła - Urząd Gminy Police around 13.24 km

const tRestaurantŁadogaSzczecin = new RestaurantOrPub(
  "Ładoga",
  "rosyjska",
  [],
  "",
  "535480759",
  30,
  "",
  [],
  "",
  "descriptionPageImg",
  []
);
const urządGminyPoliceSzczecin = new RestaurantOrPub(
  "Urząd Gminy",
  "",
  [],
  "",
  "535480759",
  30,
  "",
  [],
  "",
  "descriptionPageImg",
  []
);
export const restaurantOrPubArrayNotSorted: RestaurantOrPub[] = [
  urządGminyPoliceSzczecin,
  tRestaurantCeglanaSzczecin,
  tRestaurantŁadogaSzczecin,
];
export const restaurantOrPubArraySorted: RestaurantOrPub[] = [
  tRestaurantŁadogaSzczecin,
  tRestaurantCeglanaSzczecin,
  urządGminyPoliceSzczecin,
];
