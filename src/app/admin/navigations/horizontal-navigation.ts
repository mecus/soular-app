import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'horizontal-nav',
  templateUrl: './horizontal-navigation.html',
  styleUrls: ['./navigations.scss']
})
export class HorizontalNavigation implements OnInit {
  currentUser;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authUserState().subscribe((user)=> {
      this.currentUser = user;
    }, (err => {
      console.log(err);
    }));
  }
}
