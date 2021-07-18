type dateObject = {
  minute: number;
  hour: number;
  year: number;
  day: number;
  month: number;
};

export class BookTime {
  date: dateObject;
  people: number;

  constructor(date: dateObject, people: number) {
    this.date = date;
    this.people = people;
  }
  toJson() {
    return {
      date: this.date,
      people: this.people,
    };
  }
}
