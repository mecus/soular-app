import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-email',
  templateUrl: './password-email.component.html',
  styleUrls: ['./password-email.component.scss']
})
export class PasswordEmailComponent implements OnInit {

  constructor(private authService: AuthService) { }

  sendResetEmail(email){
    if(!email){
      return;
    }
    this.authService.sendResetPasswordEmail(email)
    .subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {
  }

}
