import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HomePage } from './home/home.page';
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
import { MenuPage } from './menu/menu.page';
import { async } from '@angular/core/testing';
import { ReservationPage } from './reservation/reservation.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages : Array<{title: string, icon: string, url: string}> = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'About Us',
      url: '/about' ,
      icon: 'information-circle'
    },
    {
      title: 'Menu',
      url: '/menu',
      icon: 'list-circle'
    },
    {
      title: 'Contact Us',
      url: '/contact',
      icon: 'person-circle'
    },
    {
      title: 'Favorites',
      url: '/favorites',
      icon: 'heart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async openReserve() {
    console.log(1);
    const modal = await this.modalController.create({
      component: ReservationPage,
    });
    return await modal.present();
  }
}
