export interface ReservationFindNextAvaliableJson {
  email?: string;
  personName?: string;
  surName?: string;
  number?: string;
  name: string;
  bookTime: {
    minute: number;
    hour: number;
    year: number;
    day: number;
    month: number;
    people: number;
    name: string;
  };
}
