import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductsComponent } from './products/products/products.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingPagesModule } from './app-routing-pages.module';
import { IndexComponent } from './index/index.component';
import { ProductsEditComponent } from './products/products-edit/products-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CategoriesFilterComponent } from './categories/categories-filter/categories-filter.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { EmployeeFilterComponent } from './employee/employee-filter/employee-filter.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    ProductsEditComponent,
    ProductsComponent,
    ProductsFilterComponent,
    CategoriesComponent,
    CategoriesFilterComponent,
    CategoriesEditComponent,
    EmployeeComponent,
    EmployeeFilterComponent,
    EmployeeEditComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    AppRoutingPagesModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatGridListModule,
    LayoutModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
   
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    HomeComponent,
    IndexComponent,
    ProductsEditComponent,
    ProductsComponent,
    ProductsFilterComponent,
    CategoriesComponent,
    CategoriesFilterComponent,
    CategoriesEditComponent,
    EmployeeComponent,
    EmployeeFilterComponent,
    EmployeeEditComponent
  ],
})
export class PagesModule { }
