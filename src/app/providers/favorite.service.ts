import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Dish } from '../shared/dish';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { DishService } from './dish.service';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Array<any>;

  constructor(private dishservice:DishService,
    private storage:Storage,
    private localNotifications: LocalNotifications) {
      storage.get('favorites').then(favorites => {
        if(favorites){
          this.favorites =favorites;
        }else{
          this.favorites = [];
        }
      })
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
      this.favorites.push(id);
      this.storage.set('favorites',this.favorites);
      this.localNotifications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully'
      });
    console.log('favorites', this.favorites);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes().pipe(
    map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      this.storage.set('favorites',this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return throwError('Deleting non-existant favorite' + id);
    }
  }
}
