import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AboutPage } from './about/about.page';
import { MenuPage } from './menu/menu.page';
import { ContactPage } from './contact/contact.page';
import { DishdetailPage } from './dishdetail/dishdetail.page';
import { FavoritesPage } from './favorites/favorites.page';
import { ReservationPage } from './reservation/reservation.page';
const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'about',
    component: AboutPage
  },
  {
    path: 'menu',
    component: MenuPage
  },
  {
    path: 'contact',
    component: ContactPage
  },
  { path: 'dishdetail/:id',
    component: DishdetailPage
  },
  { path: 'favorites',
    component: FavoritesPage
  },
  { path: 'reservation',
    component: ReservationPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'comment',
    loadChildren: () => import('./comment/comment.module').then( m => m.CommentPageModule)
  },
  // {
  //   path: 'favorites',
  //   loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  // },
  // {
  //   path: 'reservation',
  //   loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  // },
  // {
  //   path: 'dishdetail',
  //   loadChildren: () => import('./dishdetail/dishdetail.module').then( m => m.DishdetailPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
