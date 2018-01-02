import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { tUser } from '../models/user';
import { HttpHeaderResponse } from '@angular/common/http/src/response';


@Injectable()
export class AuthService {
  users;
  headers:any
  url:string = "http://localhost:3000/users/";
  // loginUrl:string = "http://localhost:3000/users/login";
  // newUrl:string = "http://localhost:3000/users/new";
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private _http:HttpClient, private _router: Router) { 
    let token = localStorage.getItem("idToken");
    this.headers = new HttpHeaders().set('Content-Type', 'application.json');
    this.users = db.collection('users');
  }
  authUserState(){
    return this.auth.authState;
  }
  setUserIdToken(){
    this.auth.idToken.subscribe(token => {
      localStorage.setItem("idToken", token);
      localStorage.setItem("flash", "userlog");
    });
  }
  loginWithPassword(user){
    // let headers:any = new HttpHeaders().set('Content-Type', 'application.json');
    // return this._http.post(this.loginUrl, user, headers)
    // .subscribe(res => {
    //   console.log(res);
    // });
    this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(res=>{
      console.log(res);
      this.setUserIdToken();
      this._router.navigate(["/"]);
    })
    .catch(err=> {
      console.log(err);
    });
  }
  signUpwithPassword(user){
    // let headers:any = new HttpHeaders().set('Content-Type', 'application.json');
    return this._http.post(this.url+"new", user, this.headers)
    .subscribe((user: any) => {
      console.log(user);
      this.auth.auth.signInWithCustomToken(user.token)
      .then(res=>{
        console.log(res);
        this.setUserIdToken();
        this._router.navigate(["/"]);
      })
      .catch(err=> {
        console.log(err);
      });
    });
  }
  userLogout(){
    localStorage.removeItem("idToken");
    return this.auth.auth.signOut();
  }


  // User Admin Management Through Backend
  listAllUsers(){
    return this._http.get(this.url, this.headers);
  }
  setUserPrivilege(user){
    return this._http.post(this.url+"set_privilege", user, this.headers);
    
  }
  sendResetPasswordEmail(email){
    return this._http.post(this.url+"password_email", {email: email}, this.headers);
  }
  passwordReset(user){
  
    return this._http.post(this.url+"password_reset", user, this.headers);
  }

  passwordResetObject(token){
    return this.db.collection("users", ref => ref.where("passwordResetToken", "==", token)).snapshotChanges();
  }
  changePassword(user){

  }
  // User account management by users
  getUserAccount(uid){
    return this.users.doc(uid).snapshotChanges();
  }
  updateUserAccount(uid, data){
    return this.users.doc(uid).update(data);
  }
}
