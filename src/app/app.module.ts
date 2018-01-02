import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module'
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.router';
import { BlogService } from './services/blog.service';
import * as APP from './components/index';
import { firebaseConfig } from './firebase-config';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { WWDOService } from './services/wwdo.service';
import { ShareModule } from './share/share.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainInterceptor } from './services/main-interceptor';
import { HomeModule } from './home/home.module';
import { ComponentModule } from './components/component.module';
import { AppService } from './services/app-service';
// declare let firebase: any;

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, AdminModule, HttpClientModule,
    RouterModule, AppRouterModule, AuthenticationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule,
    ShareModule, HomeModule, ComponentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    },
    BlogService, WWDOService, AuthService, AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
