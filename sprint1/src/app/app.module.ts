import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePageComponent} from './component/templates/home-page/home-page.component';
import {TemplatesModule} from './component/templates/templates.module';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {ReportModule} from "./component/reports/report.module";


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
    ReportModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TemplatesModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
