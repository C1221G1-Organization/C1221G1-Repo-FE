import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SupplierListComponent} from './supplier-list/supplier-list.component';
import {SupplierCreateComponent} from './supplier-create/supplier-create.component';
import {SupplierEditComponent} from './supplier-edit/supplier-edit.component';
import {SupplierDetailComponent} from './supplier-detail/supplier-detail.component';

/**
 * Routes
 *  @23h 01/06/2022 LuatTN
 *   @this  get value  Supplier
 */
const routes: Routes = [
  {path: '', component: SupplierListComponent},
  {path: 'create', component: SupplierCreateComponent},
  {path: 'edit/:supplierId', component: SupplierEditComponent},
  {path: 'detail/:supplierId', component: SupplierDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {
}
