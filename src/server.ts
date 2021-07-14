import { APIURLS } from "./core/ImportantVariables/variables";

import express from "express";
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
//Routes
const getRestaurantsArray = require("./routes/Restaurant/getRestaurantsArray");
const reservationHandler = require("./routes/Reservation/reservationHandler");
const getRestaurantInfoDescriptionPage = require("./routes/Restaurant/getRestaurantInfoDescriptionPage");
const getRestaurantInfoConfirmPage = require("./routes/Restaurant/getRestaurantInfoConfirmPage");
const getRoPAlternativeBookingHours = require("./routes/Restaurant/getRoPAlternativeBookingHours");
const confirmReservation = require("./routes/Reservation/confirmReservation");
const clientResponse = require("./routes/Reservation/clientResponse");

app.get("/afterClick", (req, res) => {
  res.render("AfterClick");
});
app.use(APIURLS.getRestaurants, getRestaurantsArray);
app.use(APIURLS.reservation.reservation, reservationHandler);
app.use(APIURLS.confirmReservation, confirmReservation);
app.use(APIURLS.clientResponse, clientResponse);
app.use(
  APIURLS.getRestaurantInfoDescriptionPage,
  getRestaurantInfoDescriptionPage
);
app.use(APIURLS.getRestaurantInfoConfirmPage, getRestaurantInfoConfirmPage);
app.use(APIURLS.getRoPAlternativeBookingHours, getRoPAlternativeBookingHours);

//Server Listening
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
