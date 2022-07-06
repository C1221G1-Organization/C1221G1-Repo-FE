import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MedicineListComponent} from './medicine-list/medicine-list.component';


const routes: Routes = [
  {path: 'list', component: MedicineListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
