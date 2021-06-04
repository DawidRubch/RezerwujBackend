//If a user doesn't provide an adress this will be it
export const DEFAULTADDRESS = "Wyszyńskiego, Szczecin";

//This will show only the restaurants in 10 km range
export const DEFAULTRADIUS = 10;

//1 is equal to 30 minutes
//This will check if a reservation is possible for a period of time
export const RESERVATIONTIMECHECK = 2;

//API
export const APIURLS = {
  serverAddress: process.env.serverURL || "http://localhost:5000",
  reservation: {
    reservation: "/reservation",
    save: "/save",
    delete: "/delete",
  },
  getRestaurants: "/getRestaurants",
  findNextAvailable: "/findNextAvailable",
  getRoPAlternativeBookingHours: "/getRoPAlternativeBookingHours",
  getRestaurantInfoDescriptionPage: "/getRoPInfoDescriptionPage",
  getRestaurantInfoConfirmPage: "/getRoPInfoConfirmPage",
  confirmReservation: "/confirm-reservation",
  clientResponse: "/client-response",
};
