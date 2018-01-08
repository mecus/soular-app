import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import * as ADMIN from './index';


const routes = [
    {
        path: 'admin',
        component: ADMIN.AdminComponent,
        children: [
            {
                path: "",
                children: [
                    { path: 'dashboard', component: ADMIN.DashboardComponent},
                    { path: 'services', component: ADMIN.ListServicesComponent},
                    { path: 'services/new', component: ADMIN.NewServiceComponent},
                    { path: 'services/edit/?', component: ADMIN.UpdateServiceComponent},
                    { path: 'applications', component: ADMIN.ApplicationComponent},
                    { path: 'applicant/:id', component: ADMIN.ApplicantComponent},
                    { path: 'users', component: ADMIN.UsersComponent},
                ]
            }
        ]
    
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]

})

export class AdminRouter {}