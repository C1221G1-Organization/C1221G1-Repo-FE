import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../../../service/supplier.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Supplier} from "../../../model/supplier";

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
    /**
     * get the value in path
     * method:  get('supplierId');
     *  @23h 01/06/2022 LuatTN
     *  @this  call  getSupplier() Detail
     */
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idSupplier = paramMap.get('supplierId');
      this.getSupplier(this.idSupplier);
    });
  }

  /**
   * get the value Supplier
   * method: get
   *  @23h 01/06/2022 LuatTN
   *  @this  get Supplier Detail
   */
  getSupplier(supplierId: string) {
    return this.supplierService.findById(supplierId).subscribe(supplier => {
      this.supplierValue = supplier
    });
  }


}
