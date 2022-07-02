import {Component, OnInit} from '@angular/core';
import {CustomerType} from "../../model/customer-type";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CustomerTypeService} from "../../service/customer-type.service";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerId: string;
  customerTypeList: CustomerType[];

  updateForm = new FormGroup({
    customerId: new FormControl("KH0006"),
    customerName: new FormControl("", [Validators.required, Validators.min(2), Validators.max(20)]),
    customerBirthday: new FormControl(""),
    customerGender: new FormControl("", [Validators.required]),
    customerAddress: new FormControl(""),
    customerPhone: new FormControl("", [Validators.required, Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})$')]),
    customerNote: new FormControl(""),
    // customerUsername: new FormControl(),
    customerType: new FormControl("", [Validators.required])
  })

  constructor(private customerService: CustomerService
    , private customerTypeService: CustomerTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.customerId = paramMap.get("customerId");
      console.log(this.customerService.findById(this.customerId).subscribe(
        d => console.log(d)
    ))
    })
  }

  ngOnInit(): void {
  }

  update(customerId: any) {

  }
}
