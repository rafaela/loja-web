import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { ProductsComponent } from './pages/products/products/products.component';
import { ProductsEditComponent } from './pages/products/products-edit/products-edit.component';
import { CategoriesComponent } from './pages/categories/categories/categories.component';
import { CategoriesEditComponent } from './pages/categories/categories-edit/categories-edit.component';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { EmployeeEditComponent } from './pages/employee/employee-edit/employee-edit.component';
import { FreightComponent } from './pages/freight/freight.component';

const routes: Routes = [
  // lazy loaded dashboard module

  { path: '', component: IndexComponent, children:[
    { path: 'produtos', component: ProductsComponent },
    { path: 'produtos/:id', component: ProductsEditComponent },
    { path: 'categorias', component: CategoriesComponent },
    { path: 'categorias/:id', component: CategoriesEditComponent },
    { path: 'funcionarios', component: EmployeeComponent },
    { path: 'funcionarios/:id', component: EmployeeEditComponent },
    { path: 'frete', component: FreightComponent }],
    canActivate: [AuthGuard]
  },

  {
    path: '', component: LoginComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent }]
  },
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
