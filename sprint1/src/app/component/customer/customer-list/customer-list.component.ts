import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../model/customer/customer';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {Router} from '@angular/router';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CustomerType} from '../../../model/customer/customer-type';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customer: Customer[] = [];
  customerType: CustomerType[] = [];
  totalPages: number;
  currentPage: number;
  data: any;
  isChoosen: boolean;
  choosenIndex: number;
  choosenId: string;
  idDelete: string;
  public isInputHidden = true;
  public isSelectHidden = false;
  @ViewChild('keySearch1') keySearch1: ElementRef;
  @ViewChild('keySearch2') keySearch2: ElementRef;
  @ViewChild('sort') sort: ElementRef;
  @ViewChild('type') type: ElementRef;
  @ViewChild('typeSort') typeSort: ElementRef;

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCustomers({page: 0, size: 5});
    this.getAllCustomerType();
    console.log(this.customerType);
  }

  getAllCustomers(request) {
    console.log(request);
    this.customerService.getAllCustomer(request).subscribe(customers => {
      if (customers !== null) {
        this.customer = customers['content'];
        this.currentPage = customers['number'];
        this.totalPages = customers['totalPages'];
      } else {
        this.customer = [];
        this.currentPage = -1;
        this.totalPages = 0;
      }
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
      console.log(this.customerType);
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
      // @ts-ignore
      switch (this.keySearch1.nativeElement.value) {
        case 'noChoice':
          break;
        case 'customerId':
          request['customerId'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerType':
          request['customerType '] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerName':
          request['customerName'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerAddress':
          request['customerAddress'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerPhone':
          request['customerPhone'] = this.keySearch2.nativeElement.value;
          break;
      }
      request['sort'] = this.sort.nativeElement.value;
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
      switch (this.keySearch1.nativeElement.value) {
        case 'noChoice':
          break;
        case 'customerId':
          request['customerId'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerType':
          request['customerType '] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerName':
          request['customerName'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerAddress':
          request['customerAddress'] = this.keySearch2.nativeElement.value;
          break;
        case
        'customerPhone':
          request['customerPhone'] = this.keySearch2.nativeElement.value;
          break;
      }
      request['sort'] = this.sort.nativeElement.value;
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
          sortBySearch: '', customerType: '', customerName: '', customerAddress: '', customerPhone: ''
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case 'customerId':
        this.getAllCustomers({
          sortBySearch: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerType':
        this.getAllCustomers({
          sortBySearch: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerName':
        this.getAllCustomers({
          sortBySearch: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerAddress':
        this.getAllCustomers({
          sortBySearch: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerPhone':
        this.getAllCustomers({
          sortBySearch: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
    }
  }

  sortBy() {
    switch (this.sort.nativeElement.value) {
      case 'customer_id':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          customerId: this.keySearch2.nativeElement.value
          // , customerType: this.keySearch1.nativeElement.value
          // , customerName: this.keySearch1.nativeElement.value
          // , customerAddress: this.keySearch1.nativeElement.value
          // , customerPhone: this.keySearch1.nativeElement.value
          , sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
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
          customerAddress: this.keySearch2.nativeElement.value,
          sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
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

  deleteCustomer(customerId: string) {
    this.customerService.delete(customerId).subscribe(() => {
      this.toastr.warning('Xóa Thành Công !', 'Thông báo', {
        timeOut: 3000,
        progressBar: true
      });
      this.router.navigateByUrl('/customer/list');
    });
    this.ngOnInit();
    this.getAllCustomers({page: 0, size: 5});
  }

  getValueToDelete(i: number, customerId: string) {
    if (this.choosenIndex !== i) {
      this.isChoosen = true;
      this.choosenIndex = i;
      this.choosenId = customerId;
    } else {
      this.isChoosen = !this.choosenId;
      this.choosenIndex = null;
      this.idDelete = null;
    }
    if (this.isChoosen) {
      this.idDelete = customerId;
    }

  }

  changeValueFind(value: any) {
    console.log(value);
    switch (value) {
      case 'customerId':
        this.isInputHidden = true;
        this.isSelectHidden = false;
        break;
      case 'customerName':
        this.isInputHidden = true;
        this.isSelectHidden = false;
        break;
      case 'customerType':
        this.isInputHidden = false;
        this.isSelectHidden = true;
        break;
      case 'customerAddress':
        this.isInputHidden = true;
        this.isSelectHidden = false;
        break;
      case 'customerPhone':
        this.isInputHidden = true;
        this.isSelectHidden = false;
        break;
    }
  }
}

