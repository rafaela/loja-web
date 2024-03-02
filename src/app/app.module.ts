import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PagesModule } from './pages/pages.module';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule, } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { AuthGuard } from './guard/auth.guard';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteComponent,
    NumberFormatPipe,
    PhonePipe,
    LoadingComponent,
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
    MatProgressSpinnerModule
    
    
  ],
  providers: [
    ApiService,
    AuthGuard,
    provideNgxMask(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
