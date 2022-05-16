import { DayOfTheWeekOpenHours } from "types";
import { EnviromentType } from ".";
import { Bt as BookTime } from "../../data/models";

export interface GetRestaurantsJson {
  body: {
    enviromentType?: EnviromentType;
    bookTime: BookTime;
  };
}

export interface GetRestaurantInfoDescriptionInterface {
  body: {
    bookTime: BookTime;
    name: string;
    enviromentType?: EnviromentType;
  };
}
export interface GetRestaurantInfoConfirmPageInterface {
  body: { name: string; enviromentType: EnviromentType };
}
export interface ReservationJson {
  name: string;
  enviromentType?: EnviromentType;
  bookTime: BookTime;
  number: string;
  email?: string;
  personName?: string;
  surName?: string;
  additionalInfo?: string;
}

/**
 * RestaurantOrPub entety received from the database
 */
export interface RoPFromFirebase {
  name: string;
  tags: string[];
  type: string;
  shortDescription: string;
  chairs: number;
  menuLink: string;
  ownerNumber: string;
  bookTimeArray: BookTime[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
}
