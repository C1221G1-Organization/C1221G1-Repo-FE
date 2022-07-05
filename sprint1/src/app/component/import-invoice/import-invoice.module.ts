import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImportInvoiceComponent} from './import-invoice.component';
import { ImportInvoiceCreateComponent } from './import-invoice-create/import-invoice-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImportInvoiceRoutingModule} from './import-invoice-routing.module';



@NgModule({
  declarations: [
    ImportInvoiceComponent,
    ImportInvoiceCreateComponent,
  ],
  imports: [
    CommonModule,
    ImportInvoiceRoutingModule,
    ReactiveFormsModule
  ]
})
export class ImportInvoiceModule { }
