const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

import { APIURLS } from "./core/ImportantVariables/variables";
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

//Routes
const getRestaurantsRoute = require("../src/routes/getRestaurantsArray");
const reservationHandler = require("../src/routes/reservationHandler");
const findNextAvailable = require("../src/routes/findNextAvailable");
const getRestaurantInfoDescriptionPage = require("../src/routes/getRestaurantInfoDescriptionPage");
const getRestaurantInfoConfirmPage = require("../src/routes/getRestaurantInfoConfirmPage");
const getRoPAlternativeBookingHours = require("../src/routes/getRoPAlternativeBookingHours");
app.use(APIURLS.getRestaurants, getRestaurantsRoute);
app.use(APIURLS.reservation.reservation, reservationHandler);
app.use(APIURLS.findNextAvailable, findNextAvailable);
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
