import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { NotFoundComponent } from './component/not-found/not-found.component';
import {ToastrModule} from 'ngx-toastr';
import { ComponentComponent } from './component/component.component';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
