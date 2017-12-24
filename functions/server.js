"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const user_1 = require("./apis/user");
const cors = require("cors");
const errorHandle_1 = require("./middlewares/errorHandle");
const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/", function (req, res, next) {
    res.json({ "Soular": "Welcome to Soular Security" });
});
app.get("/users", user_1.getUsers);
app.post("/users/login", user_1.loginUser);
app.post("/users/new", user_1.createUser);
app.post("/users/update", user_1.updateUser);
app.post("/users/set_privilege", user_1.setPrivilege);
app.delete("/users/:id", user_1.deleteUser);
app.use(errorHandle_1.errorHandler);
app.listen(app.get("port"), function () {
    console.log(`
    Server Started On Port: ${app.get("port")}
    `);
});
// exports.server = functions.https.onRequest(app);
//# sourceMappingURL=server.js.map