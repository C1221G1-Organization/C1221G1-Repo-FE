import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NotFoundComponent} from './component/not-found/not-found.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePageComponent} from './component/templates/home-page/home-page.component';
import {UserChatComponent} from './component/templates/user-chat/user-chat.component';
import {TemplatesModule} from './component/templates/templates.module';

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
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
  ],
  providers   : [],
  bootstrap   : [AppComponent]
})
export class AppModule {
}
