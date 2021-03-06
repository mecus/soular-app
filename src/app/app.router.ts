import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Route } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import * as APP from './components/index';
import * as ADMIN from './admin/index';
import * as AUTH from './authentication/index';
import { IndexComponent } from './index/index.component';

const pageNotFound: Route = {
    path: '**', component: HomeComponent
}
const routes = [
    {
        path: 'ss', component: IndexComponent,
        children: [
            {
                path: '',
                children: [
                    {path: 'services', component: APP.ServicesComponent},
                    {path: 'service/?', component: APP.ServiceComponent},
                    {path: 'about', component: APP.AboutComponent},
                    {path: 'career', component: APP.CareerComponent},
                    {path: 'news', component: APP.BlogsComponent},
                    {path: 'contact', component: APP.ContactComponent},
                    {path: 'admin/services/update', component: ADMIN.UpdateServiceComponent},
                    {path: 'admin/dashboard/?', component: ADMIN.DashboardComponent},
                    {path: 'admin/services', component: ADMIN.ListServicesComponent},
                    {path: 'application_form', component: APP.ApplicationFormComponent},
                    {path: 'login', component: AUTH.LoginComponent},
                    {path: 'sign_up', component: AUTH.SignUpComponent},
                    {path: 'password_reset_email', component: AUTH.PasswordEmailComponent},
                    {path: 'password_reset/:token', component: AUTH.PasswordResetComponent},
                    {path: 'my_account', component: APP.AccountComponent}
                ]
            }
        ]
    },
    pageNotFound

]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AppRouterModule {}