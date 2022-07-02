import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../service/supplier.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {


  constructor(private supplierService: SupplierService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  carForm: FormGroup;
  idSupplier: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idSupplier = paramMap.get('supplierId');
      this.getSupplier(this.idSupplier);
    });
  }


  getSupplier(supplierId: string) {
    return this.supplierService.findById(supplierId).subscribe(supplier => {
      this.carForm = new FormGroup({
        supplierId: new FormControl(supplier.supplierId),
        supplierName: new FormControl(supplier.supplierName),
        supplierAddress: new FormControl(supplier.supplierAddress, [Validators.required]),
        supplierPhone: new FormControl(supplier.supplierPhone, [Validators.required]),
        supplierEmail: new FormControl(supplier.supplierEmail),
        note: new FormControl(supplier.note)
      });
    });
  }


  updateSupplier() {
    const supplierValue = this.carForm.value;
    console.log(supplierValue);
    this.supplierService.updateSupplier(this.idSupplier, supplierValue).subscribe(next => {
    }, e => {
      console.log(e);
    }, () => {
      this.router.navigate(['supplier/list']);
    });

  }
}
