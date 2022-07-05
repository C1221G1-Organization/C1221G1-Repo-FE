import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicineRoutingModule } from './medicine-routing.module';
import { MedicineTypesComponent } from './medicine-types/medicine-types.component';
import {MedicineCreateComponent} from "./medicine-create/medicine-create.component";
import {MedicineListComponent} from "./medicine-list/medicine-list.component";
import {MedicineEditComponent} from "./medicine-edit/medicine-edit.component";
import {MedicineModalComponent} from "./medicine-modal/medicine-modal.component";


@NgModule({
  declarations: [
    MedicineTypesComponent,
    MedicineCreateComponent,
    MedicineListComponent,
    MedicineEditComponent,
    MedicineModalComponent
  ],
  imports: [
    CommonModule,
    MedicineRoutingModule
  ]
})
export class MedicineModule { }
