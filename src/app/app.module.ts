import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './pages/header/header.component';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BlockUI, BlockUIComponent, BlockUIModule } from 'ng-block-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { AuthGuard } from './guard/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteComponent,
    NumberFormatPipe,
    PhonePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    PagesModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 13000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    MatDialogModule,
    MatButtonModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    BlockUIModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    provideNgxMask()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
