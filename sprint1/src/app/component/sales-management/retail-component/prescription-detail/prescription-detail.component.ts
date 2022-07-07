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
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  printInvoice: string;
  arrPDF = [];

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
        item.retailPrice = Math.floor(item.retailPrice);
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
      customerId: 'KH-00001',
      employeeId: 'NV-00001',
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
          invoiceDto.invoiceMedicineList = [];
          this.invoiceMedicineDtos = [];
          this.router.navigateByUrl('/sales-management/prescription-detail/' + this.idChoice);
        }, error => {
          this.toastr.warning(error.error.errors, 'Cảnh báo', {
            timeOut: 3000,
            progressBar: true
          });
          this.invoiceMedicineDtos = [];
          invoiceDto.invoiceMedicineList = [];
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
        });
      this.resetIdAndName();
      this.toastr.success("Xóa thành công !", "Thông báo", {
        timeOut: 3000,
        progressBar: true
      });
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

  print(yes: string) {
    this.arrPDF.push( ['Sản phẩm','Số lượng', 'Giá tiền(VND)' , 'Tổng tiền(VND)'],);
    for (let item of this.listPrescriptionMedicine){
      this.arrPDF.push([item.medicineName,item.totalQuantity,item.retailPrice,item.money]);
    }
    if(this.listPrescriptionMedicine.length > 0){
      this.printInvoice = yes;
      this.generatePDF(this.printInvoice);
    }else {
      this.toastr.warning("Vui lòng chọn thuốc trước khi in hóa đơn !", "Cảnh báo", {
        timeOut: 3000,
        progressBar: true
      });
    }
    this.arrPDF = [];
  }

  private generatePDF(action: string) {
    console.log(this.listMedicineChoice);
    const docDefinition = {
      content: [
        {
          text: 'C1221G1 PHARMACODE',
          fontSize: 30,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Hóa đơn mua thuốc',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          columns: [
            [
              {
                text: `Ngày: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
            ]
          ]
        },
        {
          text: 'Chi tiết hóa đơn:',
          style: 'sectionHeader',
          color: '#865604'
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto',100 , '*' ],
            body: this.arrPDF
          }
        },
        {
          text: 'Tổng tiền:',
          style: 'sectionHeader'
        },
        {
          columns: [
            [this.totalMoney + ' VND'] ,
          ]
        },

        {
          text: 'Chi tiết bổ sung:',
          style: 'sectionHeader',
          color: '#865604'
        },
        {
          columns: [
            [{qr: `lqad1649engineer@gmail.com`, fit: '50'}],
          ]
        },
        {
          text: 'Các điều khoản và điều kiện:',
          style: 'sectionHeader',
          color: '#865604'
        },
        {
          ul: [
            'Hóa đơn có thể được trả lại sau không quá 3 ngày.',
            'Sẽ không chấp nhận hoàn trả nếu thuốc không được nguyên vẹn.',
            'Đây là hóa đơn do hệ thống tạo.',
          ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    if (action === 'yes') {
      pdfMake.createPdf(docDefinition).download();
    }
  }
}
