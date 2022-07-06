import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "../security/login/login.component";
import {LogoutComponent} from "../security/logout/logout.component";
import {SignUpComponent} from "../security/sign-up/sign-up.component";
import {LogRoutingModule} from "../security/log-routing.module";


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    LogRoutingModule,
    ReactiveFormsModule
  ]
})
export class LogModule {
}
