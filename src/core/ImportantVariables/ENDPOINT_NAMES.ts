//API
export const APIURLS = {
  serverAddress: process.env.serverURL || "http://localhost:5000",
  reservation: {
    reservation: "/reservation",
    save: "/save",
  },
  getRestaurants: "/getRestaurants",
  getRoPAlternativeBookingHours: "/getRoPAlternativeBookingHours",
  confirmReservation: "/confirm-reservation",
  clientResponse: "/client-response",
  afterClickRoPOwnerResponse: "/afterClick",
  getRestaurant: "/getRestaurant",
};
