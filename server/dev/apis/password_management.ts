import { Request, Response, NextFunction } from "express";
import { firebase } from "../configurations/firebase-config";
import { transporter, mailAccount } from "../configurations/mailer";
import * as crypto from "crypto";
import * as async from "async";
import { ref } from "firebase-functions/lib/providers/database";
const db = firebase.firestore();
const users = db.collection('users');

export const passwordEmail = (req: Request, res: Response, next: NextFunction) => {
    let email = req.body.email;
    async.waterfall([
        (done: Function) => {
            crypto.randomBytes(16, (err, buf) => {
                const token = buf.toString("hex");
                done(err, token);
              });
        },
        (token, done: Function) => {
            firebase.auth().getUserByEmail(email)
            .then((user) => {
                if(!user){
                    return res.status(201).json({status: 201, msg: "No User Found"});
                }
                let userObj = {
                    passwordResetToken: token,
                    passwordResetExpires: Date.now() + 3600000,
                    uid: user.uid,
                    email: user.email
                };
                users.doc(user.uid).update(userObj)
                .then((ref) => {
                    done(undefined, token, user);
                })
                .catch(err => {
                    return res.status(201).json({status: 201, msg: err});
                });
            })
            .catch((err) => {
                return res.status(201).json({status: 201, msg: err});
            });
        },
        (token, user, done: Function) => {
            const mailOptions = {
                to: req.body.email,
                from: `"Soular Support 👻" <${mailAccount.email}>`,
                subject: "Reset your password on Soular",
                text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
                    Please click on the following link, or paste this into your browser to complete the process:\n\n
                    http://${req.headers.origin}/password_reset/${token}\n\n
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`
                };
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    return res.status(201).json({status: 201, msg: "Email was not sent", Error: err});
                }
                res.status(200).json({status: 200, msg: `An e-mail has been sent to ${user.email} with further instructions.`});
            });
        }

    ], (err) => {
        res.status(500).json({status: 500, msg: "Something went terribly bad", Error: err });
    });

};

export const passwordReset = (req: Request, res: Response, next: NextFunction) => {
    let token = req.body.token;
    let newpassword = req.body.password;
    async.waterfall([
        (done: Function) => {
            users.where("passwordResetToken", "==", token).get()
            .then((dataSnapshot) => {
                let allData = [];
                dataSnapshot.forEach(doc => {
                    allData.push({...doc.data()});
                });
                done(undefined, allData[0]);
            })
            .catch((err) => {
                return res.status(201).json({status: 201, msg: "Reset Object not found", Error: err});
            });
        },
        (user, done: Function) => {
            firebase.auth().updateUser(user.uid, {password: newpassword})
            .then(ref => {
                done(undefined, user);
            })
            .catch(err => {
                return res.status(201).json({status: 201, msg: "Error Reseting your password", Error: err});
            });
        },
        (user, done: Function) => {
            const mailOptions = {
              to: user.email,
              from: `"Soular Admin 👻" <${mailAccount.email}>`,
              subject: "Your password has been changed",
              text:  `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            //   html: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              res.status(200).json({ status: 200, msg: "Success! Your password has been changed." });
              done(err);
            });
        }

    ], (err) => {
        res.status(500).json({status: 500, msg: "Something went terribly bad", Error: err });
    });

};
