import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import {CustomerCreateComponent} from "./customer-create/customer-create.component";
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerEditComponent} from "./customer-edit/customer-edit.component";



@NgModule({
  declarations: [
    CustomerModalComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    CustomerEditComponent,],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
