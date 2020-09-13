import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../providers/dish.service';
import { FavoriteService } from '../providers/favorite.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    @Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteService) {
    }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => { console.log(params);return this.dishservice.getDish(params['id']); }))
        .subscribe(dish => {
          this.dish = dish;
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);
          this.favorite = this.favoriteservice.isFavorite(this.dish.id);
        },
        errmess => this.errMess = <any>errmess);
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
  }
}
