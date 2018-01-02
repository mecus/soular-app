import * as admin from "firebase-admin";
import { FirebaseApp } from "@firebase/app-types";
const serviceAccount = require("../service-account-config.json");

export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soular-7fa49.firebaseio.com"
});

export const isAuthorized = (req, res, next) => {
    // console.log("Yes he is allowed");
    const token = req.headers['authorization'];
    // console.log(token);
    admin.auth().verifyIdToken(token).then(user => {
        console.log(user);
        if(user.privilege != 'admin'){
            console.log("Access Denial");
            return res.status(400).json({msg: "Unathorised access!, contact administrator"});
        }
        console.log("Access allowed");
        next();
    }).catch(err => {
        console.log(err);
        res.status(401).json({status: 401, msg: err});
    });
    // next();
};
