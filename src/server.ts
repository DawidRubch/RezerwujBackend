//External variables/modules imports
import { APIURLS } from "./core/ImportantVariables/ENDPOINT_NAMES";
import express from "express";
require("dotenv").config();
const cors = require("cors");

//Initialize variables
const app = express();
const PORT = process.env.PORT || 5000;

//Config
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/views"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Routes import
import getRestaurantsArrayRouter from "./routes/Restaurant/getRestaurantsArray";
import reservationHandlerRouter from "./routes/Reservation/reservationHandler";
import getRestaurantInfoDescriptionPageRouter from "./routes/Restaurant/getRestaurantInfoDescriptionPage";
import getRestaurantInfoConfirmPageRouter from "./routes/Restaurant/getRestaurantInfoConfirmPage";
import getRoPAlternativeBookingHoursRouter from "./routes/Restaurant/getRoPAlternativeBookingHours";
import confirmReservationRouter from "./routes/Reservation/confirmReservation";
import clientResponseRouter from "./routes/Reservation/clientResponse";
import afterClickRouter from "./routes/Reservation/afterClick";

//Routers using
app.use(APIURLS.afterClickRoPOwnerResponse, afterClickRouter);
app.use(APIURLS.getRestaurants, getRestaurantsArrayRouter);
app.use(APIURLS.reservation.reservation, reservationHandlerRouter);
app.use(APIURLS.confirmReservation, confirmReservationRouter);
app.use(APIURLS.clientResponse, clientResponseRouter);
app.use(
  APIURLS.getRestaurantInfoDescriptionPage,
  getRestaurantInfoDescriptionPageRouter
);
app.use(
  APIURLS.getRestaurantInfoConfirmPage,
  getRestaurantInfoConfirmPageRouter
);
app.use(
  APIURLS.getRoPAlternativeBookingHours,
  getRoPAlternativeBookingHoursRouter
);

//Server Listening
app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
