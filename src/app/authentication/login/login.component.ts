import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _router: Router, private FB: FormBuilder,
    private authService: AuthService 
  ) { 
    this.loginForm = FB.group({
      email: [""],
      password: [""]
    });
  }
  signUpPage(){
    this._router.navigate(["/sign_up"]);
  }
  passwordEmailPage(){
    this._router.navigate(["/password_reset_email"]);
  }
  userLogin(user){
    // console.log(user);
    this.authService.loginWithPassword(user);
  }

  ngOnInit() {
  }

}
