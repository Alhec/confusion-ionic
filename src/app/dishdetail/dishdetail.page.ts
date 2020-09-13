import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../providers/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => { console.log(params);return this.dishservice.getDish(params['id']); }))
        .subscribe(dish => {
          this.dish = dish;
          this.numcomments = this.dish.comments.length;
          let total = 0;
          this.dish.comments.forEach(comment => total += comment.rating );
          this.avgstars = (total/this.numcomments).toFixed(2);  },
        errmess => this.errMess = <any>errmess);
  }

}
