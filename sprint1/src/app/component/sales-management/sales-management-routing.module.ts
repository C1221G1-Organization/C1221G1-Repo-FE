import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesaleComponent} from "./wholesale-component/wholesale/wholesale.component";
import {RefundCustomerComponent} from "./refund-customer/refund-customer.component";


const routes: Routes = [
  {path: 'wholesale', component: WholesaleComponent},
  {path: 'refund', component: RefundCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
