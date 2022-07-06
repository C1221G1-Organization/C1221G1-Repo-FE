import {Component, OnInit} from '@angular/core';
import {PrescriptionDetail} from '../../../../dto/prescription/prescriptionDetail';
import {PrescriptionMedicineDetail} from '../../../../dto/prescription/prescriptionMedicineDetail';
import {RetailService} from '../../../../service/retail.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MedicineSale} from '../../../../dto/invoice/medicineSale';
import {InvoiceMedicineDto} from '../../../../dto/invoice/invoiceMedicineDto';
import {ListMedicineChoice} from '../../../../dto/invoice/listMedicineChoice';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {

  idChoice: string;
  prescriptionDetail: PrescriptionDetail;
  listPrescriptionMedicine: PrescriptionMedicineDetail[] = [];
  invoiceMedicineDtos: InvoiceMedicineDto[] = [];
  listMedicineChoice: ListMedicineChoice[] = [];
  totalMoney = 0;
  activeProjectIndex: number;
  flagHover: Boolean;
  idDelete = '';
  nameDelete: any;
  isDisabled: boolean;
  deleteErr: string;
  disableCreate = true;
  disableFlag: true;

  constructor(private retailService: RetailService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.idChoice = paramMap.get('id');
      this.getPrescriptionDetail(this.idChoice);
      this.getPrescriptionMedicineDetail(this.idChoice);
      console.log(this.prescriptionDetail);
    });
  }

  getPrescriptionDetail(prescriptionId: string) {
    this.retailService.getPrescriptionDetail(prescriptionId).subscribe(res => {
      this.prescriptionDetail = res;
      console.log(this.prescriptionDetail);
    });
  }

  getPrescriptionMedicineDetail(prescriptionId: string) {
    this.retailService.getPrescriptionMedicineDetail(prescriptionId).subscribe(res => {
      this.listPrescriptionMedicine = res;
      for (let item of this.listPrescriptionMedicine) {
        item.money = item.retailPrice * item.totalQuantity;
      }
      this.getTotalMoney();
    })
  }

  createRetailInvoice() {
    for (let medicine of this.listPrescriptionMedicine) {
      let invoiceMedicineDto: any = {
        medicineId: medicine.medicineId,
        quantity: medicine.totalQuantity
      };
      this.invoiceMedicineDtos.push(invoiceMedicineDto);
    }
    let invoiceDto: any = {
      customerId: 'KH-0001',
      employeeId: 'NV-0001',
      invoiceNote: 'no comment',
      invoiceMedicineList: this.invoiceMedicineDtos
    };
    console.log(invoiceDto);
    if (invoiceDto.invoiceMedicineList.length < 1) {
      this.toastr.warning("Đơn chưa có thuốc !", "Cảnh báo", {
        timeOut: 3000,
        progressBar: true
      });
    } else {
      this.retailService.createRetailInvoice(invoiceDto).subscribe(
        () => {
          this.toastr.success('Thêm Mới Thành Công !', 'Thông báo', {
            timeOut: 3000,
            progressBar: true
          });
          this.router.navigateByUrl('/sales-management/prescription-detail/' + this.idChoice);
        }, error => {
          this.toastr.warning('Thêm Mới Thất Bại !', 'Cảnh báo', {
            timeOut: 3000,
            progressBar: true
          });
          this.listMedicineChoice = [];
          console.log(error);
        }
      );
    }
  }

  activeProject(k: number, item: any) {
    if (this.activeProjectIndex != k) {
      this.flagHover = true;
    } else {
      this.flagHover = !this.flagHover;
    }
    this.activeProjectIndex = k;
    if (this.flagHover == true) {
      this.idDelete = item.medicineId;
      this.nameDelete = item.medicineName;
      this.deleteErr = '';
      console.log(this.idDelete);
    } else {
      this.idDelete = '';
      this.deleteErr = 'Bạn chưa chọn thuốc';
      console.log(this.idDelete);
    }
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function deleteMedicine
* */
  deleteMedicine(closeModal: HTMLButtonElement) {
    console.log(this.idDelete);
    if (this.idDelete != '') {
      this.listPrescriptionMedicine = this.listPrescriptionMedicine.filter(
        (item) => {
          return item.medicineId != this.idDelete;
          this.resetIdAndName();
        })
      console.log(this.listMedicineChoice);
      this.getTotalMoney();
      closeModal.click();
    } else {
      this.toastr.warning("Bạn chưa chọn thuốc !", "Cảnh báo", {
        timeOut: 3000,
        progressBar: true
      });
    }
  }

  resetIdAndName() {
    this.idDelete = '';
    this.nameDelete = '';
  }

  changeIsDisabled() {
    this.isDisabled = false;
    console.log(this.isDisabled);
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function getTotalMoney
* */
  getTotalMoney() {
    this.totalMoney = 0;
    for (let item of this.listPrescriptionMedicine) {
      this.totalMoney += item.money;
    }
  }
}
