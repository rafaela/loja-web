import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { AppModule } from '../app.module';
import { HeaderComponent } from '../pages/header/header.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    AppModule,
    MatToolbarModule,
    MatIconModule,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  exports: [
    HeaderComponent
  ],
})
export class ComponentsModule { }
