import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../service/supplier.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Supplier} from "../model/Supplier";

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  constructor(private supplierService: SupplierService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  supplierForm: FormGroup;
  idSupplier: string;

  supplierValue: Supplier = new Supplier()

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idSupplier = paramMap.get('supplierId');
      this.getSupplier(this.idSupplier);
    });
  }

  getSupplier(supplierId: string) {
    return this.supplierService.findById(supplierId).subscribe(supplier => {
      this.supplierValue= supplier
    });
  }


}
