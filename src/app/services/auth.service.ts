import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { tUser } from '../models/user';


@Injectable()
export class AuthService {
  headers:any
  url:string = "http://localhost:3000/users/";
  // loginUrl:string = "http://localhost:3000/users/login";
  // newUrl:string = "http://localhost:3000/users/new";
  constructor(private auth: AngularFireAuth, private _http:HttpClient, private _router: Router) { 
    this.headers = new HttpHeaders().set('Content-Type', 'application.json');
  }
  authUserState(){
    return this.auth.authState;
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
        this._router.navigate(["/"]);
      })
      .catch(err=> {
        console.log(err);
      });
    });
  }
  userLogout(){
    return this.auth.auth.signOut();
  }


  // User Admin Management Through Backend
  listAllUsers(){
    return this._http.get(this.url, this.headers);
  }
  setUserPrivilege(user){
    return this._http.post(this.url+"set_privilege", user, this.headers);
    
  }
}
