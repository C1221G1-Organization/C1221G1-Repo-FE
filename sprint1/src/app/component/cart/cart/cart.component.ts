import { Component, OnInit } from '@angular/core';
import {CartDetailDto} from "../../../dto/cart/CartDetailDto";
import {MedicineDtoForCart} from "../../../dto/cart/MedicineDtoForCart";
import {CartService} from "../../../service/cart/cart.service";
import {Router} from "@angular/router";
import {PaymentOnlineService} from "../../../service/cart/payment-online.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails: CartDetailDto [] = [];
  total = 0;
  medicineDelete = {} as MedicineDtoForCart;
  medicineErrorArray: string[] = [];
  display = 'none';

  constructor(private cartService: CartService,
              private route: Router,
              private paymentOnlineService: PaymentOnlineService) {
  }

  ngOnInit(): void {
  }

}
