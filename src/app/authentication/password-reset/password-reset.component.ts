import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  msg: string;
  tokenExpirationMsg: boolean = false;
  resetObj;
  constructor(private authService: AuthService,
    private _router: Router, private route: ActivatedRoute) { }

  sendNewPassword(pass1, pass2){
    if(!pass1 || pass1 != pass2){
      return this.msg = "Your password does not match! please try again";
    }
    if(pass1.length < 6 || pass1.length > 15){
      return this.msg = "Your password must be minimum of six(6) characters and maximum of fifteen(15) characters. "
    }
    let user = {
      token: this.resetObj.passwordResetToken,
      password: pass1
    }
    console.log("password matches each other", user);
    return this.authService.passwordReset(user)
    .subscribe((res) => {
      console.log(res);
    });
    
  }
  ngOnInit() {
    this.route.paramMap.map(params => {
      return params.get("token");
    }).subscribe(token => {
      // console.log(param);
      this.authService.passwordResetObject(token)
      .map(resetObj => {
        if(resetObj && resetObj.length){
          let data = resetObj[0].payload.doc.data();
          return data;
        }
        this.tokenExpirationMsg = true;
      }).subscribe((resetObj: any) => {
        console.log(resetObj);
        if(resetObj && resetObj.passwordResetExpires > Date.now()){
          console.log("Token is valid");
          this.resetObj = resetObj;
          return;
        }
        console.log("Token has expired");
        this.tokenExpirationMsg = true;
      });
    });
  }

}
