import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import {AccountListComponent} from "./account-list/account-list.component";
import {AccountEditComponent} from "./account-edit/account-edit.component";


@NgModule({
  declarations: [
    AccountListComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
