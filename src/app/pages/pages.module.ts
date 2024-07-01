import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgIf } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductsComponent } from './products/products/products.component';
import { HomeComponent } from './home/home.component';
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
import { CategoriesComponent } from './categories/categories/categories.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HeaderComponent } from './header/header.component';
import { FreightComponent } from './freight/freight.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PaymentsComponent } from './payments/payments/payments.component';
import { SalesComponent } from './sales/sales/sales.component';
import { HighlightsComponent } from './highlights/highlights/highlights.component';
import { HighlightsEditComponent } from './highlights/highlights-edit/highlights-edit.component';
import { PaymentsEditComponent } from './payments/payments-edit/payments-edit.component';
import { SalesEditComponent } from './sales/sales-edit/sales-edit.component';
import { ClientsComponent } from './clients/clients/clients.component';
import { ClientsEditComponent } from './clients/clients-edit/clients-edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndexComponent,
    ProductsEditComponent,
    ProductsComponent,
    CategoriesComponent,
    CategoriesEditComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    LoginComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    HeaderComponent,
    FreightComponent,
    PaymentsComponent,
    SalesComponent,
    HighlightsComponent,
    HighlightsEditComponent,
    PaymentsEditComponent,
    SalesEditComponent,
    ClientsComponent,
    ClientsEditComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
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
    NgxMaskDirective,
    NgxMaskPipe,
    MatNativeDateModule,
    MatDatepickerModule,
   
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    HomeComponent,
    IndexComponent,
    ProductsEditComponent,
    ProductsComponent,
    CategoriesComponent,
    CategoriesEditComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    LoginComponent,
    AuthenticationComponent,
    CreateAccountComponent,
    HeaderComponent
  ],
})
export class PagesModule { }
