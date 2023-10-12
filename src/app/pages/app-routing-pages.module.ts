import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  
  { path: '', component: IndexComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'produtos/:id', component: ProductsEditComponent },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingPagesModule { }
