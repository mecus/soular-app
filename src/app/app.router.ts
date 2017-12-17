import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const root:Route = {
    path: '',
      redirectTo: '/home', pathMatch: 'full'
  }
  const fallBack: Route = {
      path: '**', component: HomeComponent
  }

const routes = [
    {path: 'home', component: HomeComponent },
    root,
    fallBack
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRouterModule {}