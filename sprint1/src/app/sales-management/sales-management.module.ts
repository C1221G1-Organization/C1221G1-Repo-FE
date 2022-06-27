import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesManagementRoutingModule } from './sales-management-routing.module';
import {SalesManagementComponentComponent} from "./sales-management-component.component";
import {RetailComponent} from "./retail-component/retail/retail.component";
import {AvailablePrescriptionListComponent} from "./retail-component/available-prescription-list/available-prescription-list.component";
import {PrescriptionDetailComponent} from "./retail-component/prescription-detail/prescription-detail.component";
import {WholesaleComponent} from "./wholesale-component/wholesale/wholesale.component";
import { RefundCustomerComponent } from './refund-customer/refund-customer.component';


@NgModule({
  declarations: [
    SalesManagementComponentComponent,
    RetailComponent,
    AvailablePrescriptionListComponent,
    PrescriptionDetailComponent,
    WholesaleComponent,
    RefundCustomerComponent,
  ],
  imports: [
    CommonModule,
    SalesManagementRoutingModule
  ]
})
export class SalesManagementModule { }
