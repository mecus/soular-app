import {Request, Response, NextFunction } from "express";
import { firebase } from "../configurations/firebase-config";

import * as async from "async";

export const getUsers = (req, res, next) => {

    firebase.auth().listUsers()
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).json({statusCode: 200, users: userRecord.users});
        // console.log("Successfully fetched user data:", userRecord);
    })
    .catch((error) => {
        // console.log("Error fetching user data:", error);
        next(error);
    });

};
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
    let body = req.body;
    let email = req.body.email;
    let password = req.body.password;
    console.log(body);
    // firebase.auth().
    // fbClient.auth().signInWithEmailAndPassword(email, password)
    // .then((user)=> {
    //     res.status(201).json({status: "user Authenticated", user});
    // })
    // .catch((err) => {
    //     console.log(err);
    //     res.status(401).json({status: err});
    // });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    // let user = req.body;
    // res.status(201).json({user: user});
    async.waterfall([
        (done: Function) => {
            firebase.auth().createUser({
                email: req.body.email,
                emailVerified: false,
                phoneNumber: req.body.telephone,
                password: req.body.password,
                displayName: req.body.firstName+ " " +req.body.lastName,
                photoURL: "http://www.example.com/12345678/photo.png",
                disabled: false
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                console.log(err);
                next(err);
            })
        },
        (user, done: Function) => {
            firebase.auth().setCustomUserClaims(user.uid, {privilege: "user"})
            .then(()=>{
                done(null, user)
            })
            .catch((err) => {
                console.log(err);
                next(err);
            })
        },
        (user, done: Function) => {
            firebase.auth().createCustomToken(user.uid)
            .then((customToken) => {
              // Send token back to client
              res.status(201).json({token: customToken});
            })
            .catch((error) => {
              next(error);
            });
        }
    ], (err) => {
        res.status(401).json({Error: err});
    });
}
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const uid = req.body.uid;

    async.waterfall([
        (done: Function) => {
            firebase.auth().updateUser(uid, {
                email: req.body.email,
                phoneNumber: req.body.telephone,
                emailVerified: req.body.emailVerified,
                displayName: req.body.firstName+" "+req.body.lastName,
                photoURL: req.body.photoURL,
                disabled: req.body.disabled
            })
            .then(()=> {
                done(null, uid);
            })
            .catch((err)=> {

            })
        },
        (uid, done: Function) => {
            firebase.auth().setCustomUserClaims(uid, {privilege: req.body.privilege})
            .then((ref) => {
                res.status(201).json({statusCode: 201, message: "user update successfully"});
            })
            .catch((err) => {
                next(err);
            })
        }
    ], (err) => {
        res.status(401).json({statusCode: 401, Error: err});
    });

}
export const setPrivilege = (req: Request, res: Response, next: NextFunction) => {
    let uid = req.body.uid;
    firebase.auth().setCustomUserClaims(uid, {privilege: req.body.privilege})
    .then((ref) => {
        res.status(201).json({statusCode: 201, res:ref, message: "User Privileges updated Successfully"});
    })
    .catch((err) => {
        res.status(401).json({statusCode: 401, Error: err});
    })
}
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const uid = req.params.id;
    firebase.auth().deleteUser(uid)
    .then((ref) => {
        res.status(201).json({statusCode: 201, message: "User successfully deleted"});
    })
    .catch((err) => {
        res.status(401).json({statusCode: 401, Error: err});
    });
}