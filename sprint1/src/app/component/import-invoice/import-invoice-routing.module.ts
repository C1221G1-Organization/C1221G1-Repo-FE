import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportInvoiceCreateComponent} from './import-invoice-create/import-invoice-create.component';


const routes: Routes = [
  {
    path: 'create', component: ImportInvoiceCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportInvoiceRoutingModule { }
