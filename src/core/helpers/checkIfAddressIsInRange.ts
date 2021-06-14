import { ROPLocation } from "../.././data/models";
import { DEFAULTRADIUS } from "../../core/ImportantVariables/variables";
/**
 This function checks if a certain address is in DEFAULTRADIUS.
 */
export function checkIfAddressIsInRange(
  placeLocation: ROPLocation,
  restaurantLocation: ROPLocation
): boolean {
  return calculateDistance(placeLocation, restaurantLocation) <= DEFAULTRADIUS;
}
/**
 Calculates the distance beetween the place and the restaurant
 */
export function calculateDistance(
  placeLocation: ROPLocation,
  restaurantLocation: ROPLocation
) {

  
  //EarthRadius
  const earthRadius = 6371;

  //Converting diffrent values to radians

  const latDiffrence = convertToRad(placeLocation.lat - restaurantLocation.lat);
  const logDiffrence = convertToRad(
    placeLocation.long - restaurantLocation.long
  );
  const lat1 = convertToRad(placeLocation.lat);
  const lat2 = convertToRad(restaurantLocation.lat);

  //Calculations
  const a =
    Math.sin(latDiffrence / 2) * Math.sin(latDiffrence / 2) +
    Math.sin(logDiffrence / 2) *
      Math.sin(logDiffrence / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = earthRadius * c;

  return d;
}

function convertToRad(value: number) {
  return (value * Math.PI) / 180;
}
