interface IfilterRestaurantsByName {
  restaurantNamesArray: string[];
  search: string;
}

export const filterRestaurantsByName = ({
  restaurantNamesArray,
  search,
}: IfilterRestaurantsByName) =>
  restaurantNamesArray.filter((restaurantName) =>
    restaurantName.includes(search)
  );
