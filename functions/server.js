"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_1 = require("./apis/user");
const cors = require("cors");
const errorHandle_1 = require("./middlewares/errorHandle");
const password_management_1 = require("./apis/password_management");
const firebase_config_1 = require("./configurations/firebase-config");
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", function (req, res, next) {
    res.json({ "Soular": "Welcome to Soular Security" });
});
app.get("/users", firebase_config_1.isAuthorized, user_1.getUsers);
app.post("/users/login", user_1.loginUser);
app.post("/users/new", user_1.createUser);
app.post("/users/update", user_1.updateUser);
app.post("/users/set_privilege", firebase_config_1.isAuthorized, user_1.setPrivilege);
app.delete("/users/delete/:id", firebase_config_1.isAuthorized, user_1.deleteUser);
app.post("/users/password_email", password_management_1.passwordEmail);
app.post("/users/password_reset", password_management_1.passwordReset);
app.use(errorHandle_1.errorHandler);
app.listen(app.get("port"), () => {
    console.log(`
    Server Started On Port: ${app.get("port")}
    `);
});
// exports.server = functions.https.onRequest(app);
//# sourceMappingURL=server.js.map