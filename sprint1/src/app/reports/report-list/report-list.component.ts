import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportService} from "../../service/report.service";
import {Revenue} from "../../model/revenue";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  // revenues: Revenue [] = [];
  reportForm: FormGroup;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.reportForm = new FormGroup({
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.reportForm.value.type);
    if (this.reportForm.value.type === '1' || this.reportForm.value.type === '2') {
      if (this.reportForm.value.valid) {
        this.reportService.getRevenue(this.reportForm.value.startTime, this.reportForm.value.endTime)
          .subscribe( revenues => {
            // console.log(revenues);
            this.reportService.exportExcel(revenues, 'Doanh thu, lợi nhuận từ ' + this.reportForm.value.startTime +
              ' đến ' + this.reportForm.value.endTime);
          });
      } else {
        alert('Dữ liệu ngày tháng xuất báo cáo ko hợp lệ');
      }
    } else if (this.reportForm.value.type === '3') {
      this.reportService.getSupplierHaveReceivable()
        .subscribe( supplierHaveReceivable => {
          // console.log(supplierHaveReceivable);
          this.reportService.exportExcel(supplierHaveReceivable, 'Công nợ nhà cung cấp');
        });
    } else if (this.reportForm.value.type === '4') {
      if (this.reportForm.value.valid) {
        this.reportService.getRevenueByEmployee(this.reportForm.value.startTime, this.reportForm.value.endTime)
          .subscribe( revenueByEmployee => {
            this.reportService.exportExcel(revenueByEmployee, 'Doanh thu theo nhân viên từ ' + this.reportForm.value.startTime +
              ' đến ' + this.reportForm.value.endTime);
            // console.log(revenueByEmployee);
          });
      } else {
        alert('Dữ liệu ngày tháng xuất báo cáo ko hợp lệ');
      }
    } else if (this.reportForm.value.type === '5') {
      this.reportService.getMedicineNeedToImport()
        .subscribe( medicineNeedToImport => {
          // console.log(medicineNeedToImport);
          this.reportService.exportExcel(medicineNeedToImport, 'Danh sách thuốc cần nhập thêm');
        });
    } else if (this.reportForm.value.type === '6') {
      this.reportService.getMedicineBeAboutExpired()
        .subscribe( medicineBeAboutExpired => {
          // console.log(medicineBeAboutExpired);
          this.reportService.exportExcel(medicineBeAboutExpired, 'Danh sách thuốc sắp hết hạn');
        });
    } else if (this.reportForm.value.type == '') {
      alert('Vui lòng chọn mẫu báo cáo');
    } else if (this.reportForm.value.type != null) {
      alert('Hệ thống đang được nâng cấp');
    }
  }
}
