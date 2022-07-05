import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LookUpPaymentOnlineComponent} from "./look-up-payment-online/look-up-payment-online.component";


const routes: Routes = [
  {path: '', redirectTo: 'payment-online'},
  {path: 'payment-online', component: LookUpPaymentOnlineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookUpRoutingModule {
}
