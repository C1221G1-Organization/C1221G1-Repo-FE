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
  }

}
