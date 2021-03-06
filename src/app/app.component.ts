import { Component, OnInit } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HomePage } from './home/home.page';
import { AboutPage } from './about/about.page';
import { ContactPage } from './contact/contact.page';
import { MenuPage } from './menu/menu.page';
import { async } from '@angular/core/testing';
import { ReservationPage } from './reservation/reservation.page';
import { ModalController } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { Network } from '@ionic-native/network/ngx';

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
  loading: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalController: ModalController,
    private network: Network,
    private loadingCtrl: LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.network.onDisconnect().subscribe(() => {
        if (!this.loading) {
          this.loading = this.loadingCtrl.create({
            message: 'Network Disconnected'
          });
          this.loading.present();
        }
      });

      this.network.onConnect().subscribe(() => {

        // We just got a connection but we need to wait briefly
        // before we determine the connection type. Might need to wait.
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
        if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
        }
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async openReserve() {
    const modal = await this.modalController.create({
      component: ReservationPage,
    });
    return await modal.present();
  }

  async openLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
    });
    return await modal.present();
  }
}
