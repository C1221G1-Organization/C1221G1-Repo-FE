import {Component, OnInit} from '@angular/core';
import {ImportInvoice} from '../../../model/import-invoice';
import {FormControl, FormGroup} from '@angular/forms';
import {ImportInvoiceService} from '../../../service/import-invoice.service';

@Component({
  selector: 'app-import-invoice-list',
  templateUrl: './import-invoice-list.component.html',
  styleUrls: ['./import-invoice-list.component.css']
})
export class ImportInvoiceListComponent implements OnInit {

  p = 0;
  totalPages: number;
  currentPage: number;
  importInvoiceList: ImportInvoice[] = [];
  searchForm: FormGroup;
  startDate: string = '';
  endDate: string = new Date().toLocaleDateString('en-ZA');
  startTime: string = '';
  endTime: string = '23:59';
  fieldSort: string = 'import_invoice_id';
  idDelete: string;

  /**
   * this function use to create form search
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  constructor(private importInvoiceService: ImportInvoiceService) {
    this.searchForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
      fieldSort: new FormControl()
    });
  }

  /**
   * this function use to get list Import Invoice
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  ngOnInit(): void {
    this.getImportInvoiceList({
      page: 0, size: 3, startDate: this.startDate, endDate: this.endDate, startTime: this.startTime,
      endTime: this.endTime, fieldSort: this.fieldSort
    });
  }

  /**
   * this function use to get list Import Invoice at first time
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  private getImportInvoiceList(request) {
    this.importInvoiceService.getAll(request)
      .subscribe(data => {
          if (data !== null) {
            this.importInvoiceList = data.content;
            this.currentPage = data['number'];
            this.totalPages = data['totalPages'];
          } else {
            this.importInvoiceList = [];
            this.currentPage = -1;
            this.totalPages = 0;
          }
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  /**
   * this function use to get list Import Invoice when go back to the previous page
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      request['page'] = this.currentPage - 1;
      request['size'] = 3;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['fieldSort'] = this.fieldSort;
      this.getImportInvoiceList(request);
    }
  }

  /**
   * this function use to get list Import Invoice when go to next page
   *
   * @author HongHTX
   * @Time 10:00 02/07/2022
   */
  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      request['page'] = this.currentPage + 1;
      request['size'] = 3;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['fieldSort'] = this.fieldSort;
      this.getImportInvoiceList(request);
    }
  }

  /**
   * this function use to search Import Invoice
   *
   * @author HongHTX
   * @Time 11:00 02/07/2022
   */
  search() {
    if (this.searchForm.value.startDate == null) {
      this.searchForm.value.startDate = this.startDate;
    } else {
      this.startDate = this.searchForm.value.startDate;
    }
    if (this.searchForm.value.endDate == null) {
      this.searchForm.value.endDate = this.endDate;
    } else {
      this.endDate = this.searchForm.value.endDate;
    }
    if (this.searchForm.value.startTime == null) {
      this.searchForm.value.startTime = this.startTime;
    } else {
      this.startTime = this.searchForm.value.startTime;
    }
    if (this.searchForm.value.endTime == null) {
      this.searchForm.value.endTime = this.endTime;
    } else {
      this.endTime = this.searchForm.value.endTime;
    }
    if (this.searchForm.value.fieldSort == null) {
      this.searchForm.value.fieldSort = this.fieldSort;
    } else {
      this.fieldSort = this.searchForm.value.fieldSort;
    }
    this.getImportInvoiceList({
      page: 0, size: 3, startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate, startTime: this.searchForm.value.startTime,
      endTime: this.searchForm.value.endTime, fieldSort: this.searchForm.value.fieldSort
    });
  }

  /**
   * this function use to hight light row Import Invoice
   *
   * @author HongHTX
   * @Time 08:00 04/07/2022
   */
  hightlight(importInvoiceId: string, i: number) {
    this.importInvoiceList[i].complete = !this.importInvoiceList[i].complete;
    this.idDelete = importInvoiceId;
  }

  /**
   * this function use to delete Import Invoice
   *
   * @author HongHTX
   * @Time 11:00 02/07/2022
   */
  delete(idDelete: string) {
    this.importInvoiceService.delete(idDelete).subscribe(() => {
      this.ngOnInit();
    }, e => console.log(e));
  }

}
