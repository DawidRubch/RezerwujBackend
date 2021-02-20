var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rezerwuj-3bdb8.firebaseio.com",
});

const db = admin.firestore();

export default db;
