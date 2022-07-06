import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportInvoiceListComponent} from './import-invoice-list/import-invoice-list.component';


const routes: Routes = [
  {path: '', component: ImportInvoiceListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportInvoiceRoutingModule { }
