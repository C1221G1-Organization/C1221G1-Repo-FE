import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PaymentOnlineDto} from '../../../dto/cart/PaymentOnlineDto';
import {LookupPaymentOnlineService} from '../lookup-payment-online.service';

@Component({
  selector: 'app-look-up-payment-online',
  templateUrl: './look-up-payment-online.component.html',
  styleUrls: ['./look-up-payment-online.component.css']
})
export class LookUpPaymentOnlineComponent implements OnInit {
  paymentOnlines: PaymentOnlineDto[] = [];
  @ViewChild('paymentIdSearch') paymentIdSearch: ElementRef;
  @ViewChild('customerNameSearch') customerNameSearch: ElementRef;
  totalPages: number;
  currentPage: number;

  constructor(private lookupPaymentOnlineService: LookupPaymentOnlineService) {
  }

  ngOnInit(): void {
    console.log(0);
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
          console.log(error);
          this.paymentOnlines = [];
        }
      );
  }

  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      request['page'] = this.currentPage - 1;
      request['size'] = 5;
      request['paymentOnlineId'] = this.paymentIdSearch.nativeElement.value;
      request['customerName'] = this.customerNameSearch.nativeElement.value;
      this.getPaymentOnlines(request);
    }
  }

  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      request['page'] = this.currentPage + 1;
      request['size'] = 5;
      request['paymentOnlineId'] = this.paymentIdSearch.nativeElement.value;
      request['customerName'] = this.customerNameSearch.nativeElement.value;
      this.getPaymentOnlines(request);
    }
  }

  searchPaymentOnline() {
    const request = {};
    request['page'] = 0;
    request['size'] = 5;
    request['paymentOnlineId'] = this.paymentIdSearch.nativeElement.value;
    request['customerName'] = this.customerNameSearch.nativeElement.value;
    this.getPaymentOnlines(request);
  }
}
