import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../../../service/supplier.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {


  constructor(private supplierService: SupplierService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) {
  }

  supplierForm: FormGroup;
  idSupplier: string = '';
  submitted = false;
  currentPage: number = 0;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idSupplier = paramMap.get('supplierId');
      this.getSupplier(this.idSupplier);
    });
  }


  /**
   * read the value of API
   * method: get
   *  @23h 01/06/2022 LuatTN
   *   @this  get value  Supplier
   */
  getSupplier(supplierId: string) {
    return this.supplierService.findById(supplierId).subscribe(supplier => {
      this.supplierForm = new FormGroup({
        supplierId: new FormControl(supplier.supplierId),
        supplierName: new FormControl(supplier.supplierName, [Validators.required, Validators.minLength(4)]),
        supplierAddress: new FormControl(supplier.supplierAddress),
        supplierPhone: new FormControl(supplier.supplierPhone, [Validators.required,
          Validators.pattern("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")]),
        supplierEmail: new FormControl(supplier.supplierEmail, [Validators.required,
          Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")]),
        note: new FormControl(supplier.note)
      });
    });
  }

  /**
   * get the value Supplier
   * method: patch
   *  @23h 01/06/2022 LuatTN
   *  @this update Supplier
   *
   */
  updateSupplier() {
    this.submitted = true;
    const supplierValue = this.supplierForm.value;
    console.log(supplierValue);
    this.supplierService.updateSupplier(this.idSupplier, supplierValue).subscribe(next => {
    }, e => {
      console.log(e);
    }, () => {
      this.toastr.info("Cập Nhập Thông Tin Mới Cho Nhà Cung Cấp ", "Thông Báo Hệ Thống ", {
        timeOut: 3000,
        progressBar: true

      })
      this.router.navigate(['supplier/']);

    });

  }


  get supplierName() {
    return this.supplierForm.get("supplierName")
  }

  get supplierAddress() {
    return this.supplierForm.get("supplierAddress")
  }

  get supplierPhone() {
    return this.supplierForm.get("supplierPhone")
  }

  get supplierEmail() {
    return this.supplierForm.get("supplierEmail")
  }


}
