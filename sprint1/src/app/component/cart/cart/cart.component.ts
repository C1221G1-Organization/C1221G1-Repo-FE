import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../service/cart/cart.service";
import {Router} from "@angular/router";
import {CartDetailDto} from "../../../dto/cart/CartDetailDto";
import {MedicineDtoForCart} from "../../../dto/cart/MedicineDtoForCart";
import {CartAndDetailDto} from "../../../dto/cart/CartAndDetailDto";
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

  constructor(private cartService: CartService,
              private route: Router,
              private paymentOnlineService: PaymentOnlineService) {
  }

  ngOnInit(): void {
    // this.cartService.setCart();
    this.cartDetails = this.cartService.getCart();
    this.total = this.getTotal();
  }

  reload() {
    this.ngOnInit();
  }

  confirmCart() {
    let cartAndDetailDto = {} as CartAndDetailDto;
    cartAndDetailDto.cartDetail = this.cartDetails;
    console.log(cartAndDetailDto);
    this.cartService.sendCartDetailToAPI(cartAndDetailDto).subscribe(data => {
      // this.paymentOnlineService.setCartAndDetailDto(data);
      this.paymentOnlineService.setCartAndDetail(data);
      this.route.navigate(['cart/payment-online'])
    })
  }

  removeItem(medicine: MedicineDtoForCart) {
    this.cartService.removeItemFromCart(medicine);
    this.cartDetails = this.cartService.getCart();
    this.total = this.getTotal();
  }

  reduceItem(medicine: MedicineDtoForCart) {
    this.cartService.addToCart(medicine, -1);
    this.cartDetails = this.cartService.getCart();
    this.total = this.getTotal();

  }

  increaseItem(medicine: MedicineDtoForCart) {
    this.cartService.addToCart(medicine, 1);
    this.cartDetails = this.cartService.getCart();
    this.total = this.getTotal();
  }

  getTotal(): number {
    let total = 0;
    this.cartDetails.forEach(item => {
      total += (item.quantity * item.medicine.medicinePrice);
    })
    return total;
  }

  getMedicineDelete(medicine: MedicineDtoForCart) {
    this.medicineDelete = medicine;
  }
}
