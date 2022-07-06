import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicineCreateComponent} from './medicine-create/medicine-create.component';
import {MedicineEditComponent} from './medicine-edit/medicine-edit.component';
import {MedicineDetailComponent} from './medicine-detail/medicine-detail.component';
import {MedicineListComponent} from './medicine-list/medicine-list.component';


const routes: Routes = [
  {path: 'create', component: MedicineCreateComponent},
  {path: 'list', component: MedicineListComponent},
  {path: 'edit/:id', component: MedicineEditComponent},
  {path: 'detail/:medicineId', component: MedicineDetailComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MedicineRoutingModule {
}

