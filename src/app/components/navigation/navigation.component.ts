import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser;
  constructor(private _router: Router, private authService: AuthService) { }
  goToDashboard(){
    this._router.navigate(["/admin/dashboard/?", {display: "dashboard"}]);
  }
  signOut(){
    this.authService.userLogout();
  }
  goToLoginForm(){
    this._router.navigate(["/login"]);
  }
  ngOnInit() {
    this.authService.authUserState()
    .subscribe(user => {
      this.currentUser = user;
      console.log(user);
    });
  }
}
