import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule, ShareModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
