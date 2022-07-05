import {Component, OnInit} from '@angular/core';
import {PaymentOnlineDto} from "../../../dto/cart/PaymentOnlineDto";
import {PaymentOnlineService} from "../../../service/cart/payment-online.service";
import {LookupPaymentOnlineService} from "../lookup-payment-online.service";

@Component({
  selector: 'app-look-up-payment-online',
  templateUrl: './look-up-payment-online.component.html',
  styleUrls: ['./look-up-payment-online.component.css']
})
export class LookUpPaymentOnlineComponent implements OnInit {
  paymentOnlines: PaymentOnlineDto[] = []
  totalPages: number;
  currentPage: number;
  paymentIdSearch = '';
  customerNameSearch = '';

  constructor(private lookupPaymentOnlineService: LookupPaymentOnlineService) {
  }

  ngOnInit(): void {
    this.getPaymentOnlines({page: 0, size: 5});
  }


  private getPaymentOnlines(request) {
    this.lookupPaymentOnlineService.getAll(request)
      .subscribe(data => {
          console.log(data);
          this.paymentOnlines = data['content'];
          this.currentPage = data['number'];
          this.totalPages = data['totalPages'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      request['page'] = this.currentPage - 1;
      request['size'] = 5;
      request['paymentOnlineId'] = this.paymentIdSearch;
      request['customerName'] = this.customerNameSearch;
      this.getPaymentOnlines(request);
    }
  }

  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      request['page'] = this.currentPage + 1;
      request['size'] = 5;
      request['paymentOnlineId'] = this.paymentIdSearch;
      request['customerName'] = this.customerNameSearch;
      this.getPaymentOnlines(request);
    }
  }

  searchPaymentOnline(paymentIdSearch: HTMLInputElement, customerNamSearch: HTMLInputElement) {
    const request = {};
    this.paymentIdSearch = paymentIdSearch.value;
    this.customerNameSearch = customerNamSearch.value;
    request['page'] = 0;
    request['size'] = 5;
    request['paymentOnlineId'] = this.paymentIdSearch;
    request['customerName'] = this.customerNameSearch;
    this.getPaymentOnlines(request);
  }
}
