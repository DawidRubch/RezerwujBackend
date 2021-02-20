import db from "../../core/DbConfig/firebase";
const admin = require("firebase-admin");
import { BookTime, RestaurantOrPub } from "../models/";

import { mappingDataFromDb } from "../../core/helpers/mappingDataFromDb";
import { stringify } from "uuid";

/**
 Class with diffrent functions to map the data from the database.
 */
export class RestaurantPubDb {
  //Collection name in firestore database
  collectionName = "Restaurants";

  async getAllDocuments(): Promise<RestaurantOrPub[]> {
    let restaurantOrPubArr: any[] = [];
    const snapshot = await db.collection(this.collectionName).get();

    for (const doc in snapshot.docs) {
      mappingDataFromDb(snapshot.docs[doc].data(), restaurantOrPubArr);
    }
    return Promise.resolve(restaurantOrPubArr);
  }

  async getRestaurantOrPubByNameFromDb(name: string) {
    let restaurantOrPubArr: any[] = [];
    const snapshot = await db.collection(this.collectionName).doc(name).get();
    const snapshotData = snapshot.data();
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
    arrayAddOrRemove: any,
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
    const document = await db
      .collection(this.collectionName)
      .doc(restaurantName);
    await document.get().then((doc: any) => {
      if (doc.exists) {
        document.update({
          bookTimeArray: arrayAddOrRemove({
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
          }),
        });
        res.send("Success");
      } else {
        res.send("Restauracja nie istnieje");
      }
    });
  }
}
