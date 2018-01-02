import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { PasswordEmailComponent } from './password-email/password-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, ShareModule
  ],
  declarations: [SignUpComponent, LoginComponent, PasswordEmailComponent, PasswordResetComponent],
  providers: []
})
export class AuthenticationModule { }
