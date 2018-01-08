import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WWDOService } from '../services/wwdo.service';
import { ShareModule } from '../share/share.module';
import { AdminRouter } from './admin.router';
import * as ADMIN from './index';


@NgModule({
    declarations: [
        ADMIN.NewServiceComponent, ADMIN.UpdateServiceComponent, 
        ADMIN.DashboardComponent, ADMIN.ListServicesComponent, 
        ADMIN.ApplicationComponent, ADMIN.UsersComponent, 
        ADMIN.ApplicantComponent, ADMIN.AdminComponent,
        ADMIN.HorizontalNavigation, ADMIN.VarticalNavigation
    ],
    imports: [
        BrowserModule, AdminRouter,
        FormsModule, ReactiveFormsModule, 
        ShareModule 
    ],
    exports: [],
    providers: [WWDOService]
})

export class AdminModule {}