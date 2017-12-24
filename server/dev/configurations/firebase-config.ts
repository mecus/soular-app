import * as admin from "firebase-admin";
import * as client from "firebase";
import { FirebaseApp } from "@firebase/app-types";
const serviceAccount = require("../service-account-config.json");

export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soular-7fa49.firebaseio.com"
})
