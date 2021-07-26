import { EnviromentType } from ".";
import { BookTime, DayOfTheWeekOpenHours } from "../../data/models";

export interface BookTimeJson {
  minute: number;
  hour: number;
  year: number;
  day: number;
  month: number;
  people: number;
}

export interface GetRestaurantsJson {
  body: {
    enviromentType?: EnviromentType;
    bookTime: BookTimeJson;
  };
}

export interface GetRestaurantInfoDescriptionInterface {
  body: {
    bookTime: BookTimeJson;
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
  bookTime: BookTimeJson;
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
