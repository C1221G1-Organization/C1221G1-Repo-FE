import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart/cart.service';
import {Router} from '@angular/router';
import {CartDetailDto} from '../../../dto/cart/CartDetailDto';
import {MedicineDtoForCart} from '../../../dto/cart/MedicineDtoForCart';
import {CartAndDetailDto} from '../../../dto/cart/CartAndDetailDto';
import {PaymentOnlineService} from '../../../service/cart/payment-online.service';
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {Title} from "@angular/platform-browser";

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
  username: string;

  constructor(private cartService: CartService,
              private title: Title,
              private route: Router,
              private paymentOnlineService: PaymentOnlineService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng - Pharmacycode');
    if (this.tokenStorageService.getUser() != null) {
      this.username = this.tokenStorageService.getUser().username;
    }
    this.cartDetails = this.cartService.getCart();
    this.total = this.getTotal();
    window.scrollBy(0, 0);
  }

  reload() {
    this.ngOnInit();
  }

  confirmCart() {
    let cartAndDetailDto = {} as CartAndDetailDto;
    cartAndDetailDto.cartDetail = this.cartDetails;
    if (this.username != null) {
      cartAndDetailDto.customer.customerUserName = this.username;
    }
    console.log(cartAndDetailDto);
    this.cartService.sendCartDetailToAPI(cartAndDetailDto).subscribe(data => {
      // this.paymentOnlineService.setCartAndDetailDto(data);
      this.paymentOnlineService.setCartAndDetail(data);
      this.route.navigate(['cart/payment-online'])
    }, error => {
      this.medicineErrorArray = [];
      console.log(error.error);
      for (let i = 0; i < cartAndDetailDto.cartDetail.length; i++) {
        console.log("cartDetail[" + i + "].medicine");
        console.log(error.error["cartDetail[" + i + "].medicine"]);
        if (error.error["cartDetail[" + i + "].medicine"] != undefined ||
          error.error["cartDetail[" + i + "].medicine"] != null) {
          this.medicineErrorArray.push(error.error["cartDetail[" + i + "].medicine"]);
        }
        this.openModal();
      }
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
    if (this.cartDetails != null) {
      this.cartDetails.forEach(item => {
        total += (item.quantity * item.medicine.medicinePrice);
      })
    }
    return total;
  }

  getMedicineDelete(medicine: MedicineDtoForCart) {
    this.medicineDelete = medicine;
  }

  openModal() {
    // this.display = 'block';
    document.getElementById("openModalButton").click();
  }

  closeModal() {
    this.display = 'none';
  }
}
