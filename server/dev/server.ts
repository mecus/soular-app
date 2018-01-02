import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as  express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { getUsers, loginUser, createUser, deleteUser, updateUser, setPrivilege } from "./apis/user";
import * as cors from "cors";
import { errorHandler } from "./middlewares/errorHandle";
import { passwordEmail, passwordReset } from "./apis/password_management";
import { isAuthorized } from "./configurations/firebase-config";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



app.get("/", function(req, res, next){
    res.json({"Soular": "Welcome to Soular Security"});

});

app.get("/users", isAuthorized, getUsers);
app.post("/users/login", loginUser);
app.post("/users/new", createUser);
app.post("/users/update", updateUser);
app.post("/users/set_privilege", isAuthorized, setPrivilege);
app.delete("/users/delete/:id", isAuthorized, deleteUser);

app.post("/users/password_email", passwordEmail);
app.post("/users/password_reset", passwordReset);


app.use(errorHandler);
app.listen(app.get("port"), () => {
    console.log(`
    Server Started On Port: ${app.get("port")}
    `);
});

// exports.server = functions.https.onRequest(app);

