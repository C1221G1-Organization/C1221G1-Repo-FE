import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MedicineDetailComponent} from './medicine-detail/medicine-detail.component';


const routes: Routes = [
  {path: "detail/:medicineId", component: MedicineDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule { }
