import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {AuthGuard} from "../../service/security/auth.guard";


const routes: Routes = [
  {path: 'list', component: CustomerListComponent,canActivate:[AuthGuard],data:{
    roles: ["ROLE_EMPLOYEE","ROLE_MANAGER"]
    }},
  {path: 'create', component: CustomerCreateComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_EMPLOYEE","ROLE_MANAGER"]
    }},
  {path: 'edit/:customerId', component: CustomerEditComponent,canActivate:[AuthGuard],data:{
      roles: ["ROLE_EMPLOYEE","ROLE_MANAGER"]
    }}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
