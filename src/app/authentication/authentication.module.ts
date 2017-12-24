import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule 
  ],
  declarations: [SignUpComponent, LoginComponent],
  providers: []
})
export class AuthenticationModule { }
