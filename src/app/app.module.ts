import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from './admin/admin.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './app.router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
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
// declare let firebase: any;

@NgModule({
  declarations: [AppComponent, APP.HomeComponent, NavigationComponent,
    FooterComponent, APP.ServicesComponent, APP.AboutComponent, APP.CareerComponent,
    APP.ContactComponent, APP.BlogsComponent, APP.ServiceComponent
  ],
  imports: [
    BrowserModule, AdminModule, HttpClientModule,
    RouterModule, AppRouterModule, AuthenticationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule,
    ShareModule
  ],
  providers: [BlogService, WWDOService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
