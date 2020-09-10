import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AboutPage } from './about/about.page';
import { MenuPage } from './menu/menu.page';
import { ContactPage } from './contact/contact.page';

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
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
