import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewServiceComponent } from './new-service/new-service.component';
import { WWDOService } from '../services/wwdo.service';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { ApplicationComponent } from './application/application.component';
import { UsersComponent } from './users/users.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { ShareModule } from '../share/share.module';


@NgModule({
    declarations: [
        NewServiceComponent, UpdateServiceComponent, 
        DashboardComponent, ListServicesComponent, 
        ApplicationComponent, UsersComponent, ApplicantComponent
    ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, 
        ShareModule ],
    exports: [],
    providers: [WWDOService]
})

export class AdminModule {}