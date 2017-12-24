"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("../service-account-config.json");
exports.firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://soular-7fa49.firebaseio.com"
});
//# sourceMappingURL=firebase-config.js.map