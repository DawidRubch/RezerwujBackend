import admin from "firebase-admin";

const serviceAccount: any = {
  type: "service_account",
  project_id: "rezerwuj-3bdb8",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-xeir1@rezerwuj-3bdb8.iam.gserviceaccount.com",
  client_id: "114590480612259790304",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xeir1%40rezerwuj-3bdb8.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rezerwuj-3bdb8.firebaseio.com",
});

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export default db;
