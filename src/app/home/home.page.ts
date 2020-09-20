import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../providers/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../providers/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../providers/leader.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HTTP } from '@ionic-native/http/ngx';
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
    @Inject('BaseURL') private BaseURL,private localNotifications: LocalNotifications
    ) { }

  ngOnInit(): void {
    this.localNotifications.schedule({
      id: 1,
      text: 'Dish ' + 1 + ' added as a favorite successfully'
    });
    console.log('home');
    this.dishservice.getFeaturedDish()
    .subscribe((dish) => {console.log('home2');this.dish = dish;},
    errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.promotionErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.leaderErrMess = <any>errmess);
  }
  
}
