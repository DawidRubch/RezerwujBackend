/**
   Open and closing hours for every day of the week.
   */
type DayOfTheWeekOpenHoursProps = {
  openingTime: string;
  closingTime: string;
};

export const DayOfTheWeekOpenHours = ({
  openingTime,
  closingTime,
}: DayOfTheWeekOpenHoursProps) => {
  const [openHour, openMinute] = openingTime.split(":");
  const [closeHour, closeMinute] = closingTime.split(":");

  return {
    openHour: parseInt(openHour),
    openMinute: parseInt(openMinute),
    closingHour: parseInt(closeHour),
    closingMinute: parseInt(closeMinute),
    openingTime,
    closingTime,
  };
};
