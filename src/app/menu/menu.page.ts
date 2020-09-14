import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../providers/dish.service';
import { FavoriteService } from '../providers/favorite.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  dishErrMess: string;
  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController) {
    }


  ngOnInit() {
    this.dishservice.getDishes()
    .subscribe((dishes) => {this.dishes = dishes},
    errmess => this.dishErrMess = <any>errmess);
  }

  async addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
    const toast =await  this.toastCtrl.create({
      message: 'Dish ' + dish.id + ' added as a favorite successfully',
      duration: 3000
    });
    toast.present();
  }
}
