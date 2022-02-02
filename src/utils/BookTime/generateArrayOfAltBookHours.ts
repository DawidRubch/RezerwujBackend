import { BookTime, Bt } from "../../data/models";
import { checkIfBookTimeViable } from "./checkIfBookTimeViable";
import { getAttrsFromDateString } from "../getAttributesFromDatestring";
import { DayOfTheWeekOpenHours } from "types";

interface IgenerateArrayOfAltBookHours {
  initialBookTime: Bt;
  date: string;
  dayOpeningHours: DayOfTheWeekOpenHours;
}

/** 
@returns Array of 6 booktime with each being next 30 minutes
 **/
export const generateArrayOfAltBookHours = ({
  initialBookTime,
  date,
  dayOpeningHours,
}: IgenerateArrayOfAltBookHours): (Bt | 0)[] => {
  let { minutes, hour, dateString } = getAttrsFromDateString(date);

  if (minutes < 30) {
    minutes = 30;
  }

  if (minutes > 30 && minutes < 60) {
    minutes = 0;
    hour += 1;
  }

  const arrayOfAltBookHours: (Bt | 0)[] = [];

  for (let i = 0; i < 6; i += 1) {
    if (minutes >= 60) {
      hour += 1;
      minutes = 0;
    }

    //@todo: put into util function
    const updatedDate = `${dateString}T${hour}:${!minutes ? "00" : "30"}`;

    let bt = BookTime(updatedDate, initialBookTime.people);

    const isBookTimeViable = checkIfBookTimeViable(bt, dayOpeningHours);

    if (isBookTimeViable) {
      arrayOfAltBookHours.push(bt);
    } else {
      arrayOfAltBookHours.push(0);
    }

    minutes += 30;
  }

  const isSomethingThatIsNotZeroInArray = arrayOfAltBookHours.some(
    (bTOrNullOrZeros) => bTOrNullOrZeros !== 0
  );

  if (!isSomethingThatIsNotZeroInArray) {
    return [];
  }

  return arrayOfAltBookHours;
};
