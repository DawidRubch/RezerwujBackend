import express from "express";
import { APIURLS } from "../core/ImportantVariables/ENDPOINT_NAMES";
import {
  afterClickRouter,
  clientResponseRouter,
  confirmReservationRouter,
  reservationHandlerRouter,
} from "./Reservation";
import { getRestaurantRouter, getRopRouter } from "./Restaurant";
import getRestaurantsArrayRouter from "./Restaurant/getRestaurantsArray";

const router = express.Router();

router.use(APIURLS.afterClickRoPOwnerResponse, afterClickRouter);
router.use(APIURLS.clientResponse, clientResponseRouter);
router.use(APIURLS.confirmReservation, confirmReservationRouter);
router.use(APIURLS.getRestaurant, getRestaurantRouter);
router.use(APIURLS.getRestaurants, getRestaurantsArrayRouter);
router.use(APIURLS.getRoPAlternativeBookingHours, getRopRouter);
router.use(APIURLS.reservation.reservation, reservationHandlerRouter);

export default router;
