"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_config_1 = require("../configurations/firebase-config");
const async = require("async");
exports.getUsers = (req, res, next) => {
    firebase_config_1.firebase.auth().listUsers()
        .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.status(200).json({ statusCode: 200, users: userRecord.users });
        // console.log("Successfully fetched user data:", userRecord);
    })
        .catch((error) => {
        // console.log("Error fetching user data:", error);
        next(error);
    });
};
exports.loginUser = (req, res, next) => {
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
exports.createUser = (req, res, next) => {
    // let user = req.body;
    // res.status(201).json({user: user});
    async.waterfall([
        (done) => {
            firebase_config_1.firebase.auth().createUser({
                email: req.body.email,
                emailVerified: false,
                phoneNumber: req.body.telephone,
                password: req.body.password,
                displayName: req.body.firstName + " " + req.body.lastName,
                photoURL: "http://www.example.com/12345678/photo.png",
                disabled: false
            })
                .then((user) => {
                done(null, user);
            })
                .catch((err) => {
                console.log(err);
                next(err);
            });
        },
        (user, done) => {
            firebase_config_1.firebase.auth().setCustomUserClaims(user.uid, { privilege: "user" })
                .then(() => {
                done(null, user);
            })
                .catch((err) => {
                console.log(err);
                next(err);
            });
        },
        (user, done) => {
            firebase_config_1.firebase.auth().createCustomToken(user.uid)
                .then((customToken) => {
                // Send token back to client
                res.status(201).json({ token: customToken });
            })
                .catch((error) => {
                next(error);
            });
        }
    ], (err) => {
        res.status(401).json({ Error: err });
    });
};
exports.updateUser = (req, res, next) => {
    const uid = req.body.uid;
    async.waterfall([
        (done) => {
            firebase_config_1.firebase.auth().updateUser(uid, {
                email: req.body.email,
                phoneNumber: req.body.telephone,
                emailVerified: req.body.emailVerified,
                displayName: req.body.firstName + " " + req.body.lastName,
                photoURL: req.body.photoURL,
                disabled: req.body.disabled
            })
                .then(() => {
                done(null, uid);
            })
                .catch((err) => {
            });
        },
        (uid, done) => {
            firebase_config_1.firebase.auth().setCustomUserClaims(uid, { privilege: req.body.privilege })
                .then((ref) => {
                res.status(201).json({ statusCode: 201, message: "user update successfully" });
            })
                .catch((err) => {
                next(err);
            });
        }
    ], (err) => {
        res.status(401).json({ statusCode: 401, Error: err });
    });
};
exports.setPrivilege = (req, res, next) => {
    let uid = req.body.uid;
    firebase_config_1.firebase.auth().setCustomUserClaims(uid, { privilege: req.body.privilege })
        .then((ref) => {
        res.status(201).json({ statusCode: 201, res: ref, message: "User Privileges updated Successfully" });
    })
        .catch((err) => {
        res.status(401).json({ statusCode: 401, Error: err });
    });
};
exports.deleteUser = (req, res, next) => {
    const uid = req.params.id;
    firebase_config_1.firebase.auth().deleteUser(uid)
        .then((ref) => {
        res.status(201).json({ statusCode: 201, message: "User successfully deleted" });
    })
        .catch((err) => {
        res.status(401).json({ statusCode: 401, Error: err });
    });
};
//# sourceMappingURL=user.js.map