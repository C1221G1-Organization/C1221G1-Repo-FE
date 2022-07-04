import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SupplierService} from "../../service/supplier.service";
import {Supplier} from "../../model/Supplier";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  @ViewChild('nameSearchingSelect') nameSearch: ElementRef;
  @ViewChild('sort') sort: ElementRef;
  @ViewChild('valueSearch') valueSearch: ElementRef;

  public listSupplier: Supplier[];
  totalPages: number;
  currentPage: number = 0;

  valueSupplier: Supplier = new Supplier();

  constructor(private supplierService: SupplierService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListSupplier({
      page: this.currentPage, size: 5, searchId: '',
      searchName: '',
      searchAddress: '',
      searchPhone: '',
      sort: '',
    });

  }

  /**
   * delete the value
   * method: delete
   *  @23h 01/06/2022 LuatTN
   *  @this  delete Supplier
   */
  confirmDelete() {
    this.supplierService.deleteSupplier(this.valueSupplier.supplierId).subscribe(() => {
      this.ngOnInit();
      this.toastr.warning("Xóa  Thành Công !", "Thông Báo Xác Nhận", {
        timeOut: 3000,
        progressBar: true
      });
    }, e => {
      console.log(e);
    });
  }


  /**
   * previous Page
   *  @23h 01/06/2022 LuatTN
   *  @public
   */
  public previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      // @ts-ignore
      request.page = this.currentPage - 1;
      // @ts-ignore
      request.size = 5;
      // @ts-ignore
      request.owner = this.ownerSearch;
      // @ts-ignore
      request.sort = this.sort.nativeElement.value;
      this.getListSupplier(request);
    }
  }

  /**
   * next Page
   *  @23h 01/06/2022 LuatTN
   *  @public
   */
  public nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      // @ts-ignore
      request.page = this.currentPage + 1;
      // @ts-ignore
      request.size = 5;
      // @ts-ignore
      request.owner = this.ownerSearch;
      // @ts-ignore
      request.sort = this.sort.nativeElement.value;
      this.getListSupplier(request);
    }

  }

  /**
   * read the value when is on click
   * method: click()
   *  @23h 01/06/2022 LuatTN
   *   @this  get all Supplier
   */
  getValueSupplier(item: Supplier) {
    this.valueSupplier = item
  }

  /**
   * get value when searching
   * @23h 01/06/2022 LuatTN
   *
   */
  search() {
    //   get value when searching
    switch (this.nameSearch.nativeElement.value) {
      case 'supplierId': {
        this.getListSupplier({
          page: 0,
          size: 10,
          searchId: this.valueSearch.nativeElement.value,
          sort: this.sort.nativeElement.value
        })
        break;
      }
      case 'supplierName': {
        this.getListSupplier({
          page: 0,
          size: 10,
          searchName: this.valueSearch.nativeElement.value,
          sort: this.sort.nativeElement.value
        })
        break;
      }
      case 'supplierAddress': {
        this.getListSupplier({
          page: 0,
          size: 10,
          searchAddress: this.valueSearch.nativeElement.value,
          sort: this.sort.nativeElement.value
        })
        break;
      }
      case 'supplierPhone': {
        this.getListSupplier({
          page: 0,
          size: 10,
          searchPhone: this.valueSearch.nativeElement.value,
          sort: this.sort.nativeElement.value
        })
      }
    }
  }

  /**
   * method test db click
   */
  nameMethod() {
    alert(this.valueSupplier)
  }

  /**
   * read the value of API
   * method: get
   *  @23h 01/06/2022 LuatTN
   *   @this  get all Supplier
   */
  private getListSupplier(request) {
    console.log("request")
    console.log(request)
    console.log("request")
    this.supplierService.getAll(request).subscribe(data => {
        this.listSupplier = data['content'];
        this.currentPage = data.number;
        this.totalPages = data.totalPages;
      }
      , error => {
        console.log(error.error.message);
        alert(error.error.message)
      }
    );
  }
}
