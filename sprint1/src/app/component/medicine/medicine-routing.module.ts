import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MedicineCreateComponent} from './medicine-create/medicine-create.component';
import {MedicineEditComponent} from './medicine-edit/medicine-edit.component';

const routes: Routes = [
  {path: 'create', component: MedicineCreateComponent},
  {path: 'edit/:id', component: MedicineEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
