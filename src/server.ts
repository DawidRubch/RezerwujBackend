import { APIURLS } from "./core/ImportantVariables/variables";

import express from "express";
const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + '/views'));
app.set("views", __dirname +"/views");
app.set("view engine", "ejs");
//Routes
const getRestaurantsRoute = require("./routes/Restaurant/getRestaurantsArray");
const reservationHandler = require("./routes/Reservation/reservationHandler");
const getRestaurantInfoDescriptionPage = require("./routes/Restaurant/getRestaurantInfoDescriptionPage");
const getRestaurantInfoConfirmPage = require("./routes/Restaurant/getRestaurantInfoConfirmPage");
const getRoPAlternativeBookingHours = require("./routes/Restaurant/getRoPAlternativeBookingHours");
const receiveSms = require("./routes/webhooks/receiveMessages");
const confirmReservation = require("./routes/Reservation/confirmReservation");
app.use(APIURLS.getRestaurants, getRestaurantsRoute);
app.use(APIURLS.reservation.reservation, reservationHandler);

app.get("/", (req, res) => {
  res.render("index",{date:"25.02",time:"15:00",people:10});
});
app.use(
  APIURLS.getRestaurantInfoDescriptionPage,
  getRestaurantInfoDescriptionPage
);
app.use(APIURLS.getRestaurantInfoConfirmPage, getRestaurantInfoConfirmPage);
app.use(APIURLS.getRoPAlternativeBookingHours, getRoPAlternativeBookingHours);
app.use(APIURLS.receiveSms, receiveSms);

//Server Listening
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
