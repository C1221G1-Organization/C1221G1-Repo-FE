import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {CustomerType} from "../../model/customer-type";
import {CustomerService} from "../../service/customer.service";
import {CustomerTypeService} from "../../service/customer-type.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  createForm: FormGroup;
  customerTypeList: CustomerType[];


  constructor(private customerService: CustomerService,
              private customerTypeService: CustomerTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCustomerType();
    this.createForm = new FormGroup({
      customerId: new FormControl("KH0006"),
      customerName: new FormControl("", [Validators.required,Validators.min(2),Validators.max(20)]),
      customerBirthday: new FormControl(""),
      customerGender: new FormControl("",[Validators.required]),
      customerAddress: new FormControl(""),
      customerPhone: new FormControl("", [Validators.required,Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})$')]),
      customerNote: new FormControl(""),
      // customerUsername: new FormControl(),
      customerType: new FormControl("",[Validators.required])
    });
  }

  getCustomerType() {
    return this.customerTypeService.getAllCustomerType().subscribe(list => {
      this.customerTypeList = list;
    })
  }

  create() {
    const customer = this.createForm.value;
    console.log(this.createForm.value)

    this.customerService.create(customer).subscribe(() => {
      }, error => {alert("Bắt buộc phải nhập")

      },
      () => {
        this.router.navigateByUrl('customer');
      });
  }
}
