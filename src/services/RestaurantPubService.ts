import db from "../config/firebase";
import { RestaurantOrPub } from "../data/models";
import { EnviromentType, FirebaseCollectionNames } from "../core/TypeScript";

//! If this is set to true,  on the rezerwuj.co domain, the restaurants will be fetched from the test collection
const DISPLAY_TEST_DATA_ON_PROD = true;

//Takes enviroment type and returns the collection name
const getCollectionName = (
  city?: string,
  enviroment?: EnviromentType
): string => {
  if (DISPLAY_TEST_DATA_ON_PROD)
    return FirebaseCollectionNames.RESTAURANTS_TEST;
  return enviroment === "prod" && city
    ? city
    : FirebaseCollectionNames.RESTAURANTS_TEST;
};

//Takes all available restaurants
interface IgetAllDocuments {
  enviroment?: EnviromentType;
  city?: string;
}
export const getAllDocumentsFromACollection = async ({
  enviroment,
  city,
}: IgetAllDocuments): Promise<RestaurantOrPub[]> => {
  const collectionName = getCollectionName(city, enviroment);

  //TODO: change to ""return await db.collection(collectionName).listDocuments();""

  const { docs } = await db.collection(collectionName).get();

  return docs.map((doc) => doc.data() as RestaurantOrPub);
};

interface IgetRestaurantOrPubByNameFromDb extends IgetAllDocuments {
  name: string;
}

//Takes specific restaurant by name
export const getRestaurantOrPubByNameFromDb = async ({
  name,
  enviroment,
  city,
}: IgetRestaurantOrPubByNameFromDb): Promise<RestaurantOrPub | null> => {
  const collectionName = getCollectionName(city, enviroment);

  const snapshot = await db.collection(collectionName).doc(name).get();

  const snapshotData = snapshot.data();

  if (!snapshotData) return null;

  return snapshotData as RestaurantOrPub;
};

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
  enviroment?: EnviromentType,
  city?: string
) => {
  const RoP = await getRestaurantOrPubByNameFromDb({ name, enviroment, city });

  if (!RoP) {
    res.sendStatus(404);
    return null;
  }
  return RoP;
};

export const getRestaurantNamesFromCollection = async ({
  enviroment,
  city,
}: IgetAllDocuments): Promise<string[]> => {
  const collectionName = getCollectionName(city, enviroment);

  const documentsArr = await db.collection(collectionName).listDocuments();

  return documentsArr.map((doc) => doc.id);
};

interface IgetRestaurantsDataByTheirNames extends IgetAllDocuments {
  restaurantNames: string[];
}

export const getRestaurantsDataByTheirNames = async ({
  city,
  enviroment,
  restaurantNames,
}: IgetRestaurantsDataByTheirNames): Promise<RestaurantOrPub[]> => {
  const collectionName = getCollectionName(city, enviroment);

  if (restaurantNames.length === 0) return [];

  const documentsArr = await db
    .collection(collectionName)
    .where("name", "in", restaurantNames)
    .get();

  return documentsArr.docs.map((doc) => doc.data() as RestaurantOrPub);
};
