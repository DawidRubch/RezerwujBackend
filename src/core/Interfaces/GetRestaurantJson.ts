export interface GetRestaurantsJson {
    body: {
      address: string;
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
  