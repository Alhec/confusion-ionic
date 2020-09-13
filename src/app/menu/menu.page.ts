import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../providers/dish.service';
import { FavoriteService } from '../providers/favorite.service';

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
    private favoriteservice: FavoriteService,) {
    }


  ngOnInit() {
    this.dishservice.getDishes()
    .subscribe((dishes) => {this.dishes = dishes},
    errmess => this.dishErrMess = <any>errmess);
  }

  addToFavorites(dish: Dish) {
    console.log('Adding to Favorites', dish.id);
    this.favoriteservice.addFavorite(dish.id);
  }
}
