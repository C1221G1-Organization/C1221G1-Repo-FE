import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../../../model/customer/customer';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomerType} from '../../../model/customer/customer-type';
import {CustomerTypeService} from '../../../service/customer/customer-type.service';
import {CustomerService} from '../../../service/customer/customer.service';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  customers: Customer;
  customer: Customer[] = [];
  customerType: CustomerType[];
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
  @ViewChild('valueSearchDropDown') typeSort: ElementRef;

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

  /**
   * create by TinBQ
   * time: 01/07/2022
   * This method to get data from table customer in database
   */

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

  /**
   * create by TinBQ
   * time: 01/07/2022
   * This method to get data from table customer-type in database
   */
  getAllCustomerType() {
    this.customerTypeService.getAllCustomerType().subscribe(customerTypes => {
      this.customerType = customerTypes;
      console.log(this.customerType);
    });
  }

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to transfer previous page
   */
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
          request['customerType'] = this.typeSort.nativeElement.value;
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

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to transfer next page
   */
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
          request['customerType'] = this.typeSort.nativeElement.value;
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

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to search customer base on condition
   */
  search() {
    switch (this.keySearch1.nativeElement.value) {
      case '':
        this.getAllCustomers({
          customerType: this.keySearch2.nativeElement.value,
          customerName: this.keySearch2.nativeElement.value,
          customerAddress: this.keySearch2.nativeElement.value,
          customerPhone: this.keySearch2.nativeElement.value
          ,
          page: 0
          ,
          size: 5
          ,
          sort: this.sort.nativeElement.value
        });
        break;
      case 'customerId':
        this.getAllCustomers({
          customerId: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerType':
        this.getAllCustomers({
          customerType: this.typeSort.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerName':
        this.getAllCustomers({
          customerName: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerAddress':
        this.getAllCustomers({
          customerAddress: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
      case
      'customerPhone':
        this.getAllCustomers({
          customerPhone: this.keySearch2.nativeElement.value
          , page: 0
          , size: 5
          , sort: this.sort.nativeElement.value
        });
        break;
    }
  }

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to soft customer base on condition
   */
  sortBy() {
    switch (this.sort.nativeElement.value) {
      case 'customer_id':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          customerId: this.keySearch2.nativeElement.value,
          sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
        });
        break;
      case 'customer_type_id':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          customerId: this.keySearch2.nativeElement.value,
          sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
        });
        break;
      case 'customer_name':
        console.log(this.sort.nativeElement.value);
        this.getAllCustomers({
          customerName: this.keySearch2.nativeElement.value,
          sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
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
          customerPhone: this.keySearch2.nativeElement.value,
          sort: this.sort.nativeElement.value
          , dir: 'desc'
          , page: 0
          , size: 5
        });
        break;
    }
  }

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to delet customer in database
   */
  deleteCustomer(customerId: string) {
    console.log(customerId);
    this.customerService.delete(customerId).subscribe(() => {
      this.toastr.warning('Xóa Thành Công !', 'Thông báo', {
        timeOut: 3000,
        progressBar: true
      });
      this.router.navigateByUrl('/customer/list');
      this.ngOnInit();
      this.getAllCustomers({page: 0, size: 5});
      console.log(customerId);
    });
  }

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to get id delete customer
   */
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

  /**
   * create by TinBQ
   * time: 04/07/2022
   * This method to change drop down list when admin choose field'mã khách hàng'
   */
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


