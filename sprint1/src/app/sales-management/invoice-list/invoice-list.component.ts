import {Component, OnInit} from '@angular/core';
import {Invoice} from "../../model/invoice";
import {InvoiceService} from "../../service/invoice.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoiceList: Invoice[] = [];
  totalPages: number;
  currentPage: number;
  idDel: string;
  startDate: string = '';
  endDate: string = new Date().toLocaleDateString('en-ZA');
  startTime: string = "";
  endTime: string = '23:59';
  typeOfInvoiceId: string = '1';
  fieldSort: string = 'invoiceId';

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.getAllInvoice({page: 0, size: 5});
  }

  getAllInvoice(request) {
    this.invoiceService.getAll(request).subscribe(invoices => {
      this.invoiceList = invoices['content'];
      this.currentPage = invoices['number'];
      this.totalPages = invoices['totalPages'];
    }, () => {
      alert('Không tìm thấy dữ liệu');
    })
  }

  previousPage() {
    const request = {};
    if ((this.currentPage) > 0) {
      request['page'] = this.currentPage - 1;
      request['size'] = 5;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startDate'] = this.startDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['typeOfInvoiceId'] = this.typeOfInvoiceId;
      request['fieldSort'] = this.fieldSort;
      this.getAllInvoice(request);
    }
  }

  nextPage() {
    const request = {};
    if ((this.currentPage + 1) < this.totalPages) {
      request['page'] = this.currentPage - 1;
      request['size'] = 5;
      request['startDate'] = this.startDate;
      request['endDate'] = this.endDate;
      request['startDate'] = this.startDate;
      request['startTime'] = this.startTime;
      request['endTime'] = this.endTime;
      request['typeOfInvoiceId'] = this.typeOfInvoiceId;
      request['fieldSort'] = this.fieldSort;
    }
  }

  getInfo(invoiceId: string) {
    this.idDel = invoiceId;
  }

  deleteInvoice(idDel: string) {
    if (idDel == null) {
      alert("Chưa chọn hóa đơn")
    } else {
      this.invoiceService.deleteInvoiceById(idDel).subscribe(() => {
        this.ngOnInit();
      }, e => console.log(e));
    }
  }

  search() {
    console.log(this.startTime);
    console.log(this.endTime);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.fieldSort);
    console.log(this.typeOfInvoiceId);
    this.invoiceService.getAll({
      page: 0, size: 5, startDate: this.startDate, endDate: this.endDate, startTime: this.startTime,
      endTime: this.endTime, typeOfInvoiceId:this.typeOfInvoiceId, fieldSort: this.fieldSort}).subscribe(invoices => {
      this.invoiceList = invoices['content'];
      this.currentPage = invoices['number'];
      this.totalPages = invoices['totalPages'];
    }, () => {
      alert('Không tìm thấy dữ liệu');
    })
  }
}
