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

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage
  ],
  entryComponents: [
    HomePage,
    AboutPage,
    ContactPage,
    MenuPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
