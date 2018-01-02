import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as APC from './index';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule, ShareModule,
    FormsModule, ReactiveFormsModule
  ],
  declarations: [
    APC.AboutComponent,
    APC.BlogsComponent,
    APC.CareerComponent,
    APC.ContactComponent,
    APC.ServiceComponent,
    APC.ServicesComponent,
    APC.ApplicationFormComponent,
    APC.AccountComponent
  ]
})
export class ComponentModule { }
