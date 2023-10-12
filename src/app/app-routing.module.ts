import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // lazy loaded dashboard module
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
