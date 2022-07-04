import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RetailComponent} from "./retail-component/retail/retail.component";
import {AvailablePrescriptionListComponent} from "./retail-component/available-prescription-list/available-prescription-list.component";
import {PrescriptionDetailComponent} from "./retail-component/prescription-detail/prescription-detail.component";


const routes: Routes = [
  { path: "retail", component: RetailComponent},
  { path: "available-prescription", component: AvailablePrescriptionListComponent},
  { path: "prescription-detail", component: PrescriptionDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagementRoutingModule { }
