import {Component, OnInit} from '@angular/core';
import {SupplierService} from "../service/supplier.service";
import {Supplier} from "../model/Supplier";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  public listSupplier: Supplier[];
  totalPages: number;
  currentPage: number;


  constructor(private supplierService: SupplierService) {
  }

  valueSupplier: Supplier = new Supplier();

  ngOnInit(): void {
    this.getListSupplier({page: 0, size: 10});
  }

  confirmDelete() {
    if (this.valueSupplier.supplierId != "") {
      this.supplierService.deleteSupplier(this.valueSupplier.supplierId).subscribe(() => {
        this.ngOnInit();
      }, e => {
        console.log(e);
      });
    }
    this.supplierService.deleteSupplier(this.valueSupplier.supplierId)
  }

  private getListSupplier(request) {
    this.supplierService.getAll(request)
      .subscribe(data => {
          console.log(data)
          this.listSupplier = data.content;
          this.currentPage = data.number;
          this.totalPages = data.totalPages;
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }


  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      // @ts-ignore
      request.page = this.currentPage - 1;
      // @ts-ignore
      request.size = 10;
      // @ts-ignore
      request.owner = this.ownerSearch;
      this.getListSupplier(request);
    }
  }

  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      // @ts-ignore
      request.page = this.currentPage + 1;
      // @ts-ignore
      request.size = 10;
      // @ts-ignore
      request.owner = this.ownerSearch;
      this.getListSupplier(request);
    }
  }


  getValueSupplier(item: Supplier) {
    this.valueSupplier = item
  }
}
