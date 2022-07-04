import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./component/not-found/not-found.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {TemplatesModule} from "./component/templates/templates.module";


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        TemplatesModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
