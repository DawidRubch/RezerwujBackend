import {
  BookTime,
  DayOfTheWeekOpenHours,
  ROPLocation,
} from "../../data/models";

export interface RoPFromFirebase {
  name: string;
  tags: string[];
  type: string;
  shortDescription: string;
  location: { lat: number; long: number };
  chairs: number;
  menuLink: string;
  ownerNumber: string;
  bookTimeArray: BookTime[];
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
}
