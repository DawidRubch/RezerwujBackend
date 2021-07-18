
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
  afterClickRoPOwnerResponse: "/afterClick",
};
