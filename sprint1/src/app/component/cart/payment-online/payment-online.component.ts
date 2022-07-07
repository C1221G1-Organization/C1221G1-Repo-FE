import {Component, OnInit, ViewChild} from '@angular/core';
import {CurrencyExchangeService} from '../../../service/cart/currency-exchange.service';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CartAndDetailDto} from '../../../dto/cart/CartAndDetailDto';
import {PaymentOnlineService} from '../../../service/cart/payment-online.service';
import {Router} from '@angular/router';
import {CartService} from '../../../service/cart/cart.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CustomerDtoForCart} from "../../../dto/cart/CustomerDtoForCart";


@Component({
  selector: 'app-payment-online',
  templateUrl: './payment-online.component.html',
  styleUrls: ['./payment-online.component.css']
})
export class PaymentOnlineComponent implements OnInit {
  cartAndDetailDto = {} as CartAndDetailDto;
  customer = {} as CustomerDtoForCart;
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
    window.scrollBy(0, 0);
    console.log('paymentonline');
    this.paymentOnlineService.getCartAndDetail().subscribe(value => {
      this.cartAndDetailDto = value;
      if (this.cartAndDetailDto.customer != null) {
        this.customer = this.cartAndDetailDto.customer;
      }
      if (this.cartAndDetailDto.discount != null) {
        console.log('in');
        this.total = this.getTotal();
        this.discount = this.cartAndDetailDto.discount.discountValue;
        this.totalAfterDiscount = this.total * (1 - this.discount);
      } else {
        this.discount = 0;
        this.total = this.getTotal();
        this.totalAfterDiscount = this.total;
      }
      console.log(this.cartAndDetailDto);
      this.customerForm = new FormGroup({
        customerName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        customerUserName: new FormControl('',
          [Validators.required, Validators.pattern('^\\w+([\\.-]?\\w+)*@[a-z]+\\.(\\w+)(\\.\\w{2,3})?')]),
        customerPhone: new FormControl('',
          [Validators.required, Validators.pattern('^(09|08|03)\\d{8}$')]),
        customerAddress: new FormControl('',
          [Validators.required, Validators.maxLength(150)])
      });
      if (this.cartAndDetailDto.customer != null) {
        this.customerForm.patchValue(this.cartAndDetailDto.customer);
      }
      this.changeRate();
      this.initConfig();
    });

  }

  get customerUserName() {
    return this.customerForm.get('customerUserName');
  }

  get customerName() {
    return this.customerForm.get('customerName');
  }

  get customerPhone() {
    return this.customerForm.get('customerPhone');
  }

  get customerAddress() {
    return this.customerForm.get('customerAddress');
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AYEhWF15yjs4kqngtEVpTs3wSAwNJKlg-XFf7Dogm9sHO3qzuXjKjvEK7O7m-aCx-83wAH91ABiEqkZ-',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.totalUSD,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.totalUSD
              }
            }
          },
          items: [{
            name: 'product 1',
            quantity: '1',
            unit_amount: {
              currency_code: 'USD',
              value: this.totalUSD,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true',
        extraQueryParams: [{name: 'disable-funding', value: 'credit,card'}]
      },
      style: {
        label: 'pay',
        shape: 'pill',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {

        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        console.log(this.cartAndDetailDto);
        this.paymentOnlineService.saveCartAndDetailAPI(this.cartAndDetailDto).subscribe(data => {
          // console.log(this.cartAndDetailDto);
          console.log(data);
          this.cartAndDetailDto = {};
          this.isSuccess = true;
          this.isError = false;
          this.cartService.clearCart();
          this.spinner.hide();
          this.openModal();
        });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
        this.isSuccess = false;
        this.isError = true;
        this.openModal();
      },
      onClick: (data, actions) => {
        this.cartAndDetailDto.customer = this.customerForm.value;
        if (this.customer != null) {
          this.cartAndDetailDto.customer.customerId = this.customer.customerId;
        }
        console.log(this.cartAndDetailDto.customer);
        this.submitted = true;
        console.log('onClick', data, actions);
      }
    };
  }

  changeRate() {
    console.log('change');
    console.log(this.rate);
    console.log(this.totalAfterDiscount);
    this.totalUSD = (this.totalAfterDiscount / this.rate).toFixed(2);
    console.log(this.totalUSD);
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
