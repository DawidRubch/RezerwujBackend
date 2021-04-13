import db from "../../core/DbConfig/firebase";
import admin from "firebase-admin";
import { BookTime, RestaurantOrPub } from "../models";

import { mappingDataFromDb } from "../../core/helpers/mappingDataFromDb";

/**
 Class with diffrent functions to map the data from the database.
 */
export class RestaurantPubDb {
  //Collection name in firestore database
  collectionName = "Restaurants";

  async getAllDocuments(): Promise<RestaurantOrPub[]> {
    let restaurantOrPubArr: any[] = [];
    const { docs } = await db.collection(this.collectionName).get();

    for (const doc in docs) {
      mappingDataFromDb(docs[doc].data(), restaurantOrPubArr);
    }
    return Promise.resolve(restaurantOrPubArr);
  }

  async getRestaurantOrPubByNameFromDb(name: string) {
    let restaurantOrPubArr: any[] = [];
    const snapshot = await db.collection(this.collectionName).doc(name).get();

    const snapshotData = snapshot.data();
    if (!snapshotData) return 0;

    const dataInArray: RestaurantOrPub[] = mappingDataFromDb(
      snapshotData,
      restaurantOrPubArr
    );
    const data: RestaurantOrPub = dataInArray[0];

    return Promise.resolve(data);
  }
  async saveReservationToDB(
    bookTime: BookTime,
    restaurantName: string,
    res: any,
    email?: string,
    personName?: string,
    surName?: string,
    number?: string
  ) {
    await this.manageReservationsFromDb(
      bookTime,
      admin.firestore.FieldValue.arrayUnion,
      restaurantName,
      res,
      email,
      personName,
      surName,
      number
    );
  }

  async deleteReservationFromDB(
    bookTime: BookTime,
    restaurantName: string,
    res: any
  ) {
    await this.manageReservationsFromDb(
      bookTime,
      admin.firestore.FieldValue.arrayRemove,
      restaurantName,
      res
    );
  }

  async manageReservationsFromDb(
    bookTime: BookTime,
    arrayAddOrRemove: (...elements: any) => FirebaseFirestore.FieldValue,
    restaurantName: string,
    res: any,
    email?: string,
    personName?: string,
    surName?: string,
    number?: string
  ) {
    if (!bookTime.minute) {
      bookTime.minute = 0;
    }
    const document = db.collection(this.collectionName).doc(restaurantName);
    await document.get().then((doc) => {
      if (doc.exists) {
        let returnValue = arrayAddOrRemove({
          day: bookTime.day,
          hour: bookTime.hour,
          minute: bookTime.minute,
          month: bookTime.month,
          people: bookTime.people,
          year: bookTime.year,
          name: bookTime.name,
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
