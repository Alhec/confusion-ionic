import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../providers/dish.service';
import { FavoriteService } from '../providers/favorite.service';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private modalController: ModalController,
    private socialSharing:SocialSharing) {
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

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    const toast =await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      position: 'middle',
      duration: 3000});
      toast.present();
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetCtrl.create({
        buttons: [{
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        }, {
          text: 'Add a Comment',
          handler: () => {
            this.openComment();
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

    async openComment() {
      const modal = await this.modalController.create({
        component: CommentPage,
      });
      modal.onDidDismiss().then((comment) => {
        if (comment) {
          let commentAux: Comment = comment.data;
          this.dish.comments.push(commentAux);
        }
      })
      .catch(e => console.log(e));
      return await modal.present();
    }
}
