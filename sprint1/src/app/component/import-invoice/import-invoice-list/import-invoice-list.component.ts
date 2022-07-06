import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ImportInvoice} from '../../../model/import-invoice';
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
  fieldSortBy: string = 'asc';
  idDelete: string = null;
  chosenIndex: number;
  isChosen: boolean;
  chosenId: string;
  n: number;

  /**
   * this function use to create form search
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  constructor(private importInvoiceService: ImportInvoiceService,
              private toastr: ToastrService) {
    this.searchForm = new FormGroup({
      dateForm: new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      }, this.dateErrorValidator),
      timeForm: new FormGroup({
        startTime: new FormControl(),
        endTime: new FormControl()
      }, this.timeErrorValidator),
      fieldSort: new FormControl(),
      fieldSortBy: new FormControl(),
    });
  }

  /**
   * this function use to validate date
   *
   * @author HongHTX
   * @Time 19:00 05/07/2022
   */
  dateErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const start = control.get('startDate');
    if (start.value !== null) {
      this.startDate = start.value;
    }
    const end = control.get('endDate');
    if (end.value !== null) {
      this.endDate = end.value;
    }
    return start.value > end.value ? { dateError: true } : null;
  }

  /**
   * this function use to validate time
   *
   * @author HongHTX
   * @Time 19:30 05/07/2022
   */
  timeErrorValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const start = control.get('startTime');
    if (start.value !== null) {
      this.startTime = start.value;
    }
    const end = control.get('endTime');
    if (end.value !== null) {
      this.endTime = end.value;
    }
    return start.value > end.value ? { timeError: true } : null;
  }

  /**
   * this function use to get list Import Invoice
   *
   * @author HongHTX
   * @Time 09:00 02/07/2022
   */
  ngOnInit(): void {
    this.getImportInvoiceList({
      page: 0, size: 5, startDate: this.startDate, endDate: this.endDate, startTime: this.startTime,
      endTime: this.endTime, fieldSort: this.fieldSort, fieldSortBy: this.fieldSortBy
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
      request['size'] = 5;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['fieldSort'] = this.fieldSort;
      request['fieldSortBy'] = this.fieldSortBy;
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
      request['size'] = 5;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['fieldSort'] = this.fieldSort;
      request['fieldSortBy'] = this.fieldSortBy;
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
    console.log('toi dau'+this.searchForm.value.startDate)
    console.log('toi dau'+this.searchForm.value.endDate)
    console.log('toi dau'+this.searchForm.value.startTime)
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
    if (this.searchForm.value.fieldSortBy == null) {
      this.searchForm.value.fieldSortBy = this.fieldSortBy;
    } else {
      this.fieldSortBy = this.searchForm.value.fieldSortBy;
    }
    this.getImportInvoiceList({
      page: 0, size: 5, startDate: this.searchForm.value.startDate,
      endDate: this.searchForm.value.endDate, startTime: this.searchForm.value.startTime,
      endTime: this.searchForm.value.endTime, fieldSort: this.searchForm.value.fieldSort,
      fieldSortBy: this.searchForm.value.fieldSortBy
    });
    console.log('toi dui'+this.searchForm.value.startDate)
    console.log('toi dui'+this.searchForm.value.endDate)
    console.log('toi dui'+this.searchForm.value.startTime)

  }

  /**
   * this function use to hight light row Import Invoice
   *
   * @author HongHTX
   * @Time 08:00 04/07/2022
   */
  chooseImportInvoice(index: number, importInvoiceId: string, m: number): void {
    if (this.chosenIndex !== index) {
      this.isChosen = true;
      this.chosenIndex = index;
      this.chosenId = importInvoiceId;
    } else {
      this.isChosen = !this.isChosen;
      this.idDelete = null;
      this.chosenIndex = null;
    }
    if (this.isChosen) {
      this.idDelete = importInvoiceId;
    }
    this.n = m;
    console.log(this.n);
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
      this.toastr.warning('Đã Xóa Thành Công !', 'Hệ thống thông báo', {
        timeOut: 3000,
        progressBar: true
      });
    }, e => console.log(e));
    this.idDelete = null;
  }

  /**
   * this function use to reset list Import Invoice
   *
   * @author HongHTX
   * @Time 19:00 05/07/2022
   */
  resetAll() {
    this.startDate = '';
    this.endDate = new Date().toLocaleDateString('en-ZA');
    this.startTime = '';
    this.endTime = '23:59';
    this.fieldSort = 'import_invoice_id';
    this.fieldSortBy = 'asc';
    this.ngOnInit();
  }
}
