import { EnviromentType } from "../Types/EnviromentType";

export interface GetRestaurantsJson {
  body: {
    address: string;
    enviromentType: EnviromentType;
    bookTime: {
      minute: number;
      hour: number;
      year: number;
      day: number;
      month: number;
      people: number;
    };
  };
}
