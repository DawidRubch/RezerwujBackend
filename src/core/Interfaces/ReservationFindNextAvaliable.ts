import { EnviromentType } from "../Types/EnviromentType";

export interface ReservationFindNextAvaliableJson {
  name: string;
  enviromentType: EnviromentType;
  bookTime: {
    minute: number;
    hour: number;
    year: number;
    day: number;
    month: number;
    people: number;
    name: string;
  };
  number: string;
  email?: string;
  personName?: string;
  surName?: string;
  additionalInfo?: string;
}
