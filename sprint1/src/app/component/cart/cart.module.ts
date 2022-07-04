import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import {PaymentOnlineComponent} from "./payment-online/payment-online.component";
import {CartComponent} from "./cart/cart.component";
import {PaymentFinishComponent} from "./payment-finish/payment-finish.component";



@NgModule({
  declarations: [
    CartModalComponent,
    PaymentOnlineComponent,
    CartComponent,
    PaymentFinishComponent,],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
