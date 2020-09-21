import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomePage } from './home/home.page'
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
import { MenuPage } from './menu/menu.page';
import { DishdetailPage } from './dishdetail/dishdetail.page';
import { baseURL } from './shared/baseurl';
import { FavoritesPage } from './favorites/favorites.page';
import { ReservationPage } from './reservation/reservation.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentPage } from './comment/comment.page';
import { LoginPage } from './login/login.page';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { EmailComposer } from '@ionic-native/email-composer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera'
import { from } from 'rxjs';
import { RegisterPage } from './register/register.page';
import { Network } from '@ionic-native/network';
@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  entryComponents: [
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: 'BaseURL', useValue: baseURL},
    LocalNotifications,
    EmailComposer,
    SocialSharing,
    Camera,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
