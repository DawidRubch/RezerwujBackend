import db from "../../core/DbConfig/firebase";
import admin from "firebase-admin";
import { BookTime, RestaurantOrPub } from "../models";

import { mappingDataFromDbToRoP } from "../../core/helpers/mappingDataFromDb";
import {
  EnviromentType,
  FirebaseCollectionNames,
  ReservationJson,
  RoPFromFirebase,
} from "../../core/TypeScript";

/**
 Class with diffrent functions to map the data from the database.
 */
class RestaurantPubDb {
  //Collection name in firestore database

  async getAllDocuments(
    enviromentType?: EnviromentType
  ): Promise<RestaurantOrPub[]> {
    const restaurantOrPubArr: RestaurantOrPub[] = [];

    const collection =
      enviromentType == "prod"
        ? FirebaseCollectionNames.RESTAURANTS_PROD
        : FirebaseCollectionNames.RESTAURANTS_TEST;

    const { docs } = await db.collection(collection).get();

    for (const doc of docs) {
      restaurantOrPubArr.push(
        mappingDataFromDbToRoP(doc.data() as RoPFromFirebase)
      );
    }
    return restaurantOrPubArr;
  }

  async getRestaurantOrPubByNameFromDb(
    name: string,
    enviromentType?: EnviromentType
  ) {
    const collection =
      enviromentType == "prod"
        ? FirebaseCollectionNames.RESTAURANTS_PROD
        : FirebaseCollectionNames.RESTAURANTS_TEST;

    const snapshot = await db.collection(collection).doc(name).get();

    const snapshotData = snapshot.data();
    if (!snapshotData) return 0;

    return mappingDataFromDbToRoP(snapshotData as RoPFromFirebase);
  }

  async saveReservationToDB(
    bookTime: BookTime,
    {
      enviromentType,
      name,
      email,
      personName,
      surName,
      number,
    }: ReservationJson,
    res: any
  ) {
    await this.manageReservationsFromDb(
      bookTime,
      admin.firestore.FieldValue.arrayUnion,
      name,
      res,
      enviromentType,
      email,
      personName,
      surName,
      number
    );
  }

  async manageReservationsFromDb(
    bookTime: BookTime,
    arrayAddOrRemove: (...elements: any) => FirebaseFirestore.FieldValue,
    restaurantName: string,
    res: any,
    enviromentType?: EnviromentType,
    email?: string,
    personName?: string,
    surName?: string,
    number?: string
  ) {
    if (!bookTime.minute) {
      bookTime.minute = 0;
    }

    const collection =
      enviromentType == "prod"
        ? FirebaseCollectionNames.RESTAURANTS_PROD
        : FirebaseCollectionNames.RESTAURANTS_TEST;

    const document = db.collection(collection).doc(restaurantName);
    await document.get().then((doc) => {
      if (doc.exists) {
        const returnValue = arrayAddOrRemove({
          day: bookTime.day,
          hour: bookTime.hour,
          minute: bookTime.minute,
          month: bookTime.month,
          people: bookTime.people,
          year: bookTime.year,
          email,
          personName,
          surName,
          number,
        });

        document.update({
          bookTimeArray: returnValue,
        });

        res.send("Success");
      } else {
        res.send("Restauracja nie istnieje");
      }
    });
  }
}

export default new RestaurantPubDb();
