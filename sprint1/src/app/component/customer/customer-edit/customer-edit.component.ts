import {Component, OnInit} from '@angular/core';
import {CustomerType} from '../../../model/customer/customer-type';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CustomerTypeService} from '../../../service/customer-type.service';
import {CustomerService} from '../../../service/customer.service';
import {Customer} from '../../../model/customer/customer';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer: Customer;
  customerId: string;
  customerTypeList: CustomerType[];

  updateForm = new FormGroup({
    customerId: new FormControl(''),
    customerName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators
      .pattern('^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ][\\s\\S]*$')]),
    customerBirthday: new FormControl(''),
    customerGender: new FormControl('', [Validators.required]),
    customerAddress: new FormControl(''),
    customerPhone: new FormControl('', [Validators.required, Validators.
    pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    customerNote: new FormControl('', [Validators.minLength(2), Validators.maxLength(20)]),
    // customerUsername: new FormControl(),
    customerType: new FormControl('', [Validators.required])
  });

  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.customerId = paramMap.get('customerId');
      console.log(this.customerService.findById(this.customerId).subscribe(
        d => console.log(d)
      ));
    });
  }

  getCustomer(index: string) {
    return this.customerService.findById(index).subscribe(item => {
      this.customer = item;
      this.updateForm.patchValue(item);
      console.log(this.updateForm.value);
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  update(index: string) {
    const value = this.updateForm.value;
    this.customerService.update(index, value).subscribe(() => {
      }, error => {
        // alert("Bắt buộc phải nhập đúng thông tin")
        this.toastr.warning('Bắt buộc phải nhập đúng thông tin !', '', {
          timeOut: 3000,
          progressBar: true
        });

      },
      () => {
        this.router.navigateByUrl('customer');
      });
  }

  getList() {
    this.customerTypeService.getAllCustomerType().subscribe(list => {
      this.customerTypeList = list;
      console.log(this.customerTypeList);
    });
    this.getCustomer(this.customerId);
  }
}
