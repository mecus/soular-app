import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './app.router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogService } from './services/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule, AppRouterModule
  ],
  providers: [BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
