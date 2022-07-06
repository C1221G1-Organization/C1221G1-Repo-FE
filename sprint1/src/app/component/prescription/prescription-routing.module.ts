import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrescriptionListComponent} from './prescription-list/prescription-list.component';
import {PrescriptionCreateComponent} from './prescription-create/prescription-create.component';
import {PrescriptionEditComponent} from './prescription-edit/prescription-edit.component';
import {MedicinePrescriptionCreateComponent} from './medicine-prescription-create/medicine-prescription-create.component';


const routes: Routes = [
  {path: 'list', component: PrescriptionListComponent},
  {path: 'create', component: PrescriptionCreateComponent},
  {path: 'edit/:id', component: PrescriptionEditComponent},
  {path: 'create-medicine-prescription', component: MedicinePrescriptionCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
