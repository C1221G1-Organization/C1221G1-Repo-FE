import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RetailComponent} from "./retail-component/retail/retail.component";
import {AvailablePrescriptionListComponent} from "./retail-component/available-prescription-list/available-prescription-list.component";
import {PrescriptionDetailComponent} from "./retail-component/prescription-detail/prescription-detail.component";
import {WholesaleComponent} from "./wholesale-component/wholesale/wholesale.component";
import {RefundCustomerComponent} from "./refund-customer/refund-customer.component";


const routes: Routes = [
  { path: "retail", component: RetailComponent},
  { path: "available-prescription", component: AvailablePrescriptionListComponent},
  { path: "prescription-detail/:id", component: PrescriptionDetailComponent},
  { path: "wholesale", component: WholesaleComponent},
  { path: "refund", component: RefundCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
