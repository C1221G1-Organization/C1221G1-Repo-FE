import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Customer} from '../../model/customer';
import {CustomerTypeService} from '../../service/customer-type.service';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customer: Customer[] = [];
  customerType: Customer[] = [];
  totalPages: number;
  currentPage: number;
  data: any;
  valueCustomer: Customer = new Customer();
  typeOf: any;
  @ViewChild('keySearch1') keySearch1: ElementRef;
  @ViewChild('keySearch2') keySearch2: ElementRef;
  @ViewChild('sort') sort: ElementRef;
  @ViewChild('type') type: ElementRef;

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCustomers({page: 0, size: 5});
    this.getAllCustomerType();
  }

  getAllCustomers(request) {
    console.log(request);
    this.customerService.getAllCustomer(request).subscribe(customers => {
      // @ts-ignore
      this.customer = customers.content;
      // @ts-ignore
      this.totalPages = customers.totalPages;
      // @ts-ignore
      this.currentPage = customers.number;
      console.log(customers);
    });
  }

  getAllCustomerType() {
    this.customerTypeService.getAllCustomerType().subscribe(customerTypes => {
      // @ts-ignore
      this.customerType = customerTypes.content;
    });
  }

  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      // @ts-ignore
      request.page = this.currentPage - 1;
      // @ts-ignore
      request.size = 5;
      // @ts-ignore
      request.owner = this.ownerSearch;
      this.getAllCustomers(request);
    }
  }

  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      // @ts-ignore
      request.page = this.currentPage + 1;
      // @ts-ignore
      request.size = 5;
      // @ts-ignore
      request.owner = this.ownerSearch;
      this.getAllCustomers(request);
    }
  }

  search() {
    // console.log(this.keySearch1.nativeElement.value);
    // console.log(this.keySearch2.nativeElement.value);
    switch (this.keySearch1.nativeElement.value) {
      case 'noChoice':
        this.getAllCustomers({
          customerId: '', customerType: '', customerName: '', customerAddress: '', customerPhone: ''
          , page: 0
          , size: 5
        });
        break;
      case 'customer_id':
        this.getAllCustomers({
          customerId: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
        });
        break;
      case 'type':
        this.getAllCustomers({
          customerType: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
        });
        break;
      case 'name':
        this.getAllCustomers({
          customerName: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
        });
        break;
      case
      'address':
        this.getAllCustomers({
          customerAddress: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
        });
        break;
      case
      'phone':
        this.getAllCustomers({
          customerPhone: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
        });
        break;
    }
  }

  sortBy() {
    switch (this.sort.nativeElement.value) {
      case 'customer_id':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          sort: this.sort.nativeElement.value
          , dir: 'desc'
        });
        break;
      case 'customer_type_id':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          sort: this.sort.nativeElement.value
          , dir: 'desc'
        });
        break;
      case 'customer_name':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          sort: this.sort.nativeElement.value
          , dir: 'desc'
        });
        break;
      case 'customer_address':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          sort: this.sort.nativeElement.value
          , dir: 'desc'
        });
        break;
      case 'customer_phone':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          sort: this.sort.nativeElement.value
          , dir: 'desc'
        });
        break;
    }
  }

  getValueToDelete(item: Customer) {
    this.valueCustomer = item;
    console.log(this.valueCustomer);
  }

  deleteCustomer(customerId: string) {
    this.customerService.delete(customerId).subscribe(() => {
      this.toastr.success('Xóa Thành Công !', 'Thông báo', {
        timeOut: 3000,
        progressBar: true
      });
      this.router.navigateByUrl('/customer/list');
    });
    this.ngOnInit();
    this.getAllCustomers({page: 0, size: 5});
  }


  // typeSearch(type: HTMLOptionElement) {
  //   // @ts-ignore
  //   if (type === 'type') {
  //     this.typeOf = true;
  //   }
  // }
  typeSearch(choice: any) {
    // @ts-ignore
    if (choice === 'type') {
      this.typeOf = true;
    }
  }
}

