import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionModalComponent } from './prescription-modal/prescription-modal.component';
import {PrescriptionCreateComponent} from "./prescription-create/prescription-create.component";
import {PrescriptionEditComponent} from "./prescription-edit/prescription-edit.component";
import {PrescriptionListComponent} from "./prescription-list/prescription-list.component";


@NgModule({
  declarations: [
    PrescriptionModalComponent,
    PrescriptionCreateComponent,
    PrescriptionEditComponent,
    PrescriptionListComponent,
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule
  ]
})
export class PrescriptionModule { }
