import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportInvoiceRoutingModule } from './import-invoice-routing.module';
import { ImportInvoiceListComponent } from './import-invoice-list/import-invoice-list.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ImportInvoiceListComponent],
  exports: [
    ImportInvoiceListComponent
  ],
  imports: [
    CommonModule,
    ImportInvoiceRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ImportInvoiceModule {}
