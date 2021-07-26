import { EnviromentType } from "../../core/TypeScript";
import RestaurantPubDb from "../../data/database/RestaurantPubDataBase";
/**
 *Function used to return the RestaurantOrPub component
 *
 * @param name RoP name saved in the database
 * @param enviromentType either production or test
 * @param res response from the ExpressJs library
 */
export const getRoP = async (
  name: string,
  res: any,
  enviromentType?: EnviromentType
) => {
  const RoP = await RestaurantPubDb.getRestaurantOrPubByNameFromDb(
    name,
    enviromentType
  );

  if (RoP === 0) {
    res.sendStatus(404);
    return null;
  }
  return RoP;
};
