import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {AngularFireStorageModule} from '@angular/fire/storage';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {config} from '../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePageComponent} from './component/templates/home-page/home-page.component';
import {TemplatesModule} from './component/templates/templates.module';
// @ts-ignore
import {AngularFireAuthModule} from '@angular/fire/auth';
import 'firebase/database';
// @ts-ignore
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReportModule} from './component/reports/report.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    ReportModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
