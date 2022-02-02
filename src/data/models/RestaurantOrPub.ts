import { DayOfTheWeekOpenHours } from "types";
import { Bt } from ".";

export class RestaurantOrPub {
  name: string;
  type: string;
  tags: string[];
  shortDescription: string;
  image: string;
  descriptionPageImg: string;
  weekArray: Array<DayOfTheWeekOpenHours | null>;
  alternativeBookingHours: Array<Bt | null | 0> | 0;

  constructor(
    name: string,
    type: string,
    //Tags such as 'miła atmosfera' or "dużo opcji wegetariańskich"
    tags: string[],
    shortDescription: string,
    //Url to the image
    image: string,
    descriptionPageImg: string,
    //Day of the week is shown by indexes
    //0 is Sunday
    //1 is Monday
    //2 is Tuesday ...
    weekArray: Array<DayOfTheWeekOpenHours | null>
  ) {
    this.descriptionPageImg = descriptionPageImg;
    this.name = name;
    this.type = type;
    this.tags = tags;
    this.shortDescription = shortDescription;
    this.image = image;
    this.weekArray = weekArray;
    this.alternativeBookingHours = [];
  }
}
