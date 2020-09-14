import { Component, OnInit, Inject } from '@angular/core';
import { async } from '@angular/core/testing';
import { AlertController, IonItemSliding, LoadingController, ToastController } from '@ionic/angular';
import { FavoriteService } from '../providers/favorite.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;
  constructor(private favoriteservice: FavoriteService,
    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  async deleteFavorite(item: IonItemSliding, id: number) {
    console.log('delete', id);
    const alert =  await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: 'Do you want to delete Dish '+ id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Deleting . . .'
            });
            const toast = await this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 3000});
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {this.favorites = favorites; loading.dismiss(); toast.present(); } ,
                errmess =>{ this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });

    alert.present();
    item.close();
  }

}
