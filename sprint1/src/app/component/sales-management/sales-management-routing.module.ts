import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RetailComponent} from './retail-component/retail/retail.component';
import {AvailablePrescriptionListComponent} from './retail-component/available-prescription-list/available-prescription-list.component';
import {PrescriptionDetailComponent} from './retail-component/prescription-detail/prescription-detail.component';
import {InvoiceListComponent} from './invoice-list/invoice-list.component';
import {AuthGuard} from "../../service/security/auth.guard";



const routes: Routes = [
  {path: 'retail', component: RetailComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_MANAGER","ROLE_EMPLOYEE"]
    }},
  {path: 'available-prescription', component: AvailablePrescriptionListComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_MANAGER","ROLE_EMPLOYEE"]
    }},
  {path: 'prescription-detail/:id', component: PrescriptionDetailComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_MANAGER","ROLE_EMPLOYEE"]
    }},
  {path: 'invoices', component: InvoiceListComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_MANAGER","ROLE_EMPLOYEE"]
    }}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class SalesManagementRoutingModule {
}
