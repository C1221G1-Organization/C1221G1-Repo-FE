import {Component, OnInit, ViewChild} from '@angular/core';
import {CartAndDetailDto} from "../../../dto/cart/CartAndDetailDto";
import {IPayPalConfig} from "ngx-paypal";
import {FormGroup} from "@angular/forms";
import {CurrencyExchangeService} from "../../../service/cart/currency-exchange.service";
import {PaymentOnlineService} from "../../../service/cart/payment-online.service";
import {Router} from "@angular/router";
import {CartService} from "../../../service/cart/cart.service";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-payment-online',
  templateUrl: './payment-online.component.html',
  styleUrls: ['./payment-online.component.css']
})
export class PaymentOnlineComponent implements OnInit {
  cartAndDetailDto = {} as CartAndDetailDto;
  rate = 23315;
  public payPalConfig ?: IPayPalConfig;
  total: number;
  totalAfterDiscount: number;
  totalUSD: string;
  customerForm: FormGroup;
  submitted = false;
  discount = 0;
  @ViewChild('myModal') myModal;
  display = 'none';
  isSuccess = false;
  isError = false;

  constructor(private currencyExchangeService: CurrencyExchangeService,
              private paymentOnlineService: PaymentOnlineService,
              private route: Router,
              private cartService: CartService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  getTotal(): number {
    let total = 0;
    this.cartAndDetailDto.cartDetail.forEach(item => {
      total += (item.quantity * item.medicine.medicinePrice);
    });
    return total;
  }

  onSubmit() {
    this.submitted = true;
  }

  openModal() {
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }

  returnHome() {
    this.route.navigate(['home-page']);
  }
}
