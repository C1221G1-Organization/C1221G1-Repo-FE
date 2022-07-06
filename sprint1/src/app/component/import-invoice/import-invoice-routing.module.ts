import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportInvoiceListComponent} from './import-invoice-list/import-invoice-list.component';
import {ImportInvoiceCreateComponent} from "./import-invoice-create/import-invoice-create.component";


const routes: Routes = [
  {path: '', component: ImportInvoiceListComponent},
  {path: 'create', component: ImportInvoiceCreateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportInvoiceRoutingModule { }
