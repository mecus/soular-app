import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
// import * as ADMIN from './index';

const root:Route = {
    path: '', 
    redirectTo: '/home', pathMatch: 'full'
  }
  const pageNotFound: Route = {
      path: '**', component: HomeComponent
  }
const routes = [
    {path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    root
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})

export class RootRouter {}