import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AboutPage } from './about/about.page';
import { MenuPage } from './menu/menu.page';
import { ContactPage } from './contact/contact.page';
import { DishdetailPage } from './dishdetail/dishdetail.page';
import { from } from 'rxjs';
import { FavoritesPage } from './favorites/favorites.page';
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
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
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
