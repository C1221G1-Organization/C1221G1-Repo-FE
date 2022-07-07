import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {RetailService} from "../../../../service/retail.service";
import {MedicineSale} from "../../../../dto/invoice/medicineSale";
import {InvoiceMedicineDto} from "../../../../dto/invoice/invoiceMedicineDto";
import {ListMedicineChoice} from "../../../../dto/invoice/listMedicineChoice";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css']
})
export class RetailComponent implements OnInit {
  invoiceForm: FormGroup;
  medicineSales: MedicineSale[] = [];
  invoiceMedicineDtos: InvoiceMedicineDto[] = [];
  listMedicineChoice: ListMedicineChoice[] = [];
  note: string;
  localDateTime: any;
  totalMoney = 0;
  idDelete = '';
  nameDelete: string;
  index: number;
  flagHover = false;
  deleteMedicineChoiceArr: any = [];
  isDisabled = true;
  disableFlag = true;
  deleteErr: string;
  printInvoice: string;
  arrPDF = [];

  constructor(private retailService: RetailService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      medicineSale: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.pattern('[0-9]*')]),
      unit: new FormControl('', [Validators.required])
    })
    this.getMedicineDto();
    this.localDateTime = new Date().toLocaleDateString();
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function getMedicineDto
* */
  getMedicineDto() {
    this.retailService.getMedicineDto().subscribe(medicineSales => {
      console.log(medicineSales)
      this.medicineSales = medicineSales;
    }, error => {
      console.log(error)
    })
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function addListMedicine
* */
  addListMedicine() {
    if (!this.invoiceForm.valid || this.invoiceForm.value.unit != 'vien'
      || this.invoiceForm.value.unit != 'vi' || this.invoiceForm.value.unit != 'hop') {
      this.invoiceForm.markAllAsTouched();
    } else {
      let idChoice = this.invoiceForm.value.medicineSale.medicineId;
      let nameChoice = this.invoiceForm.value.medicineSale.medicineName;
      let quantityChoice = this.invoiceForm.value.quantity;
      console.log(quantityChoice);
      let unitChoice = this.invoiceForm.value.unit;
      console.log(unitChoice);
      let priceChoice: number;
      if (unitChoice == 'vien') {
        priceChoice = Math.floor(1 * this.invoiceForm.value.medicineSale.retailPrice);
      } else if (unitChoice == 'vi') {
        priceChoice = Math.floor(10 * this.invoiceForm.value.medicineSale.retailPrice);
      } else if (unitChoice == 'hop') {
        priceChoice = Math.floor(100 * this.invoiceForm.value.medicineSale.retailPrice);
      }
      let moneyChoice = quantityChoice * priceChoice
      let flag = false;
      let medicine: any = {
        medicineId: idChoice,
        medicineName: nameChoice,
        retailPrice: priceChoice,
        quantity: quantityChoice,
        unit: unitChoice,
        money: moneyChoice,
      };
      const myArray = this.listMedicineChoice;
      const test = myArray.filter(data => data.medicineId == medicine.medicineId && medicine.medicineId != '')
      if (idChoice == undefined || idChoice == '' || idChoice == null || nameChoice == '' || quantityChoice == ''
        || unitChoice == '' || test.length > 0 || quantityChoice < 1) {
        flag = true;
      } else {
        flag = false;
      }
      if (!flag) {
        this.isDisabled = false;
        this.listMedicineChoice.push(medicine);
      } else {
        this.isDisabled = true;
      }
      console.log(this.listMedicineChoice);
      this.getTotalMoney();
      this.resetForm();
      this.ngOnInit();
    }

  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function resetForm
* */
  resetForm() {
    this.invoiceForm = new FormGroup({
      medicineSale: new FormControl(''),
      quantity: new FormControl(''),
      unit: new FormControl('')
    })
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function createRetailInvoice
* */
  createRetailInvoice() {
    // this.listMedicineChoice = [];
    for (let medicine of this.listMedicineChoice) {
      let invoiceMedicineDto: any = {
        medicineId: medicine.medicineId,
        quantity: medicine.quantity
      }
      this.invoiceMedicineDtos.push(invoiceMedicineDto);
    }
    let invoiceDto: any = {
      customerId: 'KH-0001',
      employeeId: 'NV-0001',
      invoiceNote: this.note,
      invoiceMedicineList: this.invoiceMedicineDtos
    };
    console.log(invoiceDto);
    if (invoiceDto.invoiceMedicineList.length < 1) {
      this.toastr.warning("Danh sách thuốc trống !", "Cảnh báo", {
        timeOut: 3000,
        progressBar: true
      });
    } else {
      this.retailService.createRetailInvoice(invoiceDto).subscribe(
        () => {
          this.toastr.success("Thanh toán thành công !", "Thông báo", {
            timeOut: 3000,
            progressBar: true
          });
          this.totalMoney = 0;
          this.listMedicineChoice = [];
          this.invoiceMedicineDtos = [];
        }, error => {
          console.log(error);
          this.toastr.warning(error.error.errors, "Cảnh báo", {
            timeOut: 3000,
            progressBar: true
          });
          this.totalMoney = 0;
          this.listMedicineChoice = [];
          this.invoiceMedicineDtos = [];
        }
      )
    }
  }

  /*
 * Created by DaLQA
 * Time: 10:30 AM 3/07/2022
 * Function: function getTotalMoney
 * */
  getTotalMoney() {
    this.totalMoney = 0;
    for (let item of this.listMedicineChoice) {
      this.totalMoney += item.money;
    }
  }

  /*
 * Created by DaLQA
 * Time: 10:30 AM 3/07/2022
 * Function: function multipleExist
 * */
  activeProjectIndex: number;

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
      console.log(this.idDelete);
    } else {
      this.idDelete = '';
      this.deleteErr = "Bạn chưa chọn thuốc để xóa!"
      console.log(this.idDelete);
    }
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function deleteMedicine
* */
  deleteMedicine(closeModal: HTMLButtonElement) {
    if (this.idDelete != '') {
      this.listMedicineChoice = this.listMedicineChoice.filter(
        (item) => {
          return item.medicineId != this.idDelete;
        });
      this.resetIdAndName();
      this.toastr.success("Xóa thành công !", "Thông báo", {
        timeOut: 3000,
        progressBar: true
      });
      this.deleteMedicineChoiceArr = [];
      console.log(this.listMedicineChoice);
      this.getTotalMoney();
      closeModal.click();
    }
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function resetIdAndName;
* */
  resetIdAndName() {
    this.idDelete = '';
    this.nameDelete = '';
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function deleteMedicine
* */
  changeIsDisabled() {
    this.isDisabled = false;
    console.log(this.isDisabled);
  }

  print() {
    this.arrPDF.push( ['Sản phẩm','Số lượng', 'Giá tiền(VND)' , 'Tổng tiền(VND)'],);
    for (let item of this.listMedicineChoice){
      this.arrPDF.push([item.medicineName,item.quantity,item.retailPrice,item.money]);
    }
    if(this.listMedicineChoice.length > 0){
      this.printInvoice = 'yes';
      this.generatePDF(this.printInvoice);
    }else {
      this.toastr.warning("Vui lòng chọn thuốc trước khi in hóa đơn !", "Cảnh báo", {
        timeOut: 3000,
        progressBar: true
      });
    }
    this.arrPDF = [];
  }

  generatePDF(action: string) {
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
            widths: ['*', 'auto', 100, '*'],
            body: this.arrPDF
          }
        },
        {
          text: 'Tổng tiền:',
          style: 'sectionHeader'
        },
        {
          columns: [
            [this.totalMoney + ' VND'],
          ]
        },

        {
          text: 'Chi tiết bổ sung:',
          style: 'sectionHeader',
          color: '#865604'
        },
        {
          columns: [
            [{qr: `c12pharmacy@gmail.com`, fit: '50'}],
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
      pdfMake.createPdf(docDefinition).download('invoice.pdf');
    }
  }
}
