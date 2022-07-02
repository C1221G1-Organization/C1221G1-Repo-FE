import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../service/supplier.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  constructor(private supplierService: SupplierService) {
  }

  ngOnInit(): void {
  }

  supplierForm: FormGroup = new FormGroup({
    supplierId: new FormControl(""),
    supplierName: new FormControl(""),
    supplierAddress: new FormControl(""),
    supplierPhone: new FormControl(""),
    supplierEmail: new FormControl(""),
    note: new FormControl(""),
    flag: new FormControl(true)
  })


  createSupplier() {
    const supplierValue = this.supplierForm.value;
    console.log(supplierValue)
    if (this.supplierForm.valid) {
      console.log(supplierValue)
      this.supplierService.saveSupplier(supplierValue).subscribe(() => {
        this.supplierForm.reset();
        alert('OK!!! ');
      });
    }
  }
}
