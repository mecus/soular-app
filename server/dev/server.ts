import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as  express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { getUsers, loginUser, createUser, deleteUser, updateUser, setPrivilege } from "./apis/user";
import * as cors from "cors";
import { errorHandler } from "./middlewares/errorHandle";

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



app.get("/", function(req, res, next){
    res.json({"Soular": "Welcome to Soular Security"});

});

app.get("/users", getUsers);
app.post("/users/login", loginUser);
app.post("/users/new", createUser);
app.post("/users/update", updateUser);
app.post("/users/set_privilege", setPrivilege);
app.delete("/users/:id", deleteUser);


app.use(errorHandler);
app.listen(app.get("port"), function(){
    console.log(`
    Server Started On Port: ${app.get("port")}
    `);
});

// exports.server = functions.https.onRequest(app);

