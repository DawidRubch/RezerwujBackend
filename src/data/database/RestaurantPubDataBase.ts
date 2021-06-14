import db from "../../core/DbConfig/firebase";
import admin from "firebase-admin";
import { BookTime, RestaurantOrPub } from "../models";

import { mappingDataFromDb } from "../../core/helpers/mappingDataFromDb";
import { RoPFromFirebase } from "../../core/Interfaces/RoPFromFirebase";

/**
 Class with diffrent functions to map the data from the database.
 */
export class RestaurantPubDb {
  //Collection name in firestore database
  collection = "Restaurants";

  async getAllDocuments(): Promise<RestaurantOrPub[]> {
    const restaurantOrPubArr: any[] = [];
    const { docs } = await db.collection(this.collection).get();

    for (const doc of docs) {
      mappingDataFromDb(doc.data() as RoPFromFirebase, restaurantOrPubArr);
    }
    return restaurantOrPubArr;
  }

  async getRestaurantOrPubByNameFromDb(name: string) {
    const restaurantOrPubArr: any[] = [];
    const snapshot = await db.collection(this.collection).doc(name).get();

    const snapshotData = snapshot.data();
    if (!snapshotData) return 0;

    const dataInArray: RestaurantOrPub[] = mappingDataFromDb(
      snapshotData as RoPFromFirebase,
      restaurantOrPubArr
    );
    const data: RestaurantOrPub = dataInArray[0];

    return data;
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
    const document = db.collection(this.collection).doc(restaurantName);
    await document.get().then((doc) => {
      if (doc.exists) {
        const returnValue = arrayAddOrRemove({
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
