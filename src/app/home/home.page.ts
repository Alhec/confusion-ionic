import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../providers/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../providers/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../providers/leader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  promotionErrMess: string;
  leader: Leader;
  leaderErrMess: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishservice.getFeaturedDish()
    .subscribe((dish) => {this.dish = dish},
    errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.promotionErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.leaderErrMess = <any>errmess);
  }

}
