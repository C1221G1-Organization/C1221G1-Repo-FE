import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {RetailService} from "../../../../service/retail.service";
import {MedicineSale} from "../../../../dto/invoice/medicineSale";
import {InvoiceMedicineDto} from "../../../../dto/invoice/invoiceMedicineDto";
import {ListMedicineChoice} from "../../../../dto/invoice/ListMedicineChoice";
import {Router} from "@angular/router";


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
  idDelete: string;
  nameDelete: string;
  index: number;
  flagHover = false
  deleteMedicineChoiceArr: any = [];
  public selectRow;

  constructor(private fb: FormBuilder,
              private retailService: RetailService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      medicineSale: new FormControl(''),
      quantity: new FormControl(''),
      unit: new FormControl('')
    })
    this.getMedicineDto();
    this.listMedicineChoice;
    this.localDateTime = new Date().toLocaleDateString();
  }

  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function getMedicineDto
* */
  getMedicineDto() {
    this.retailService.getMedicineDto().subscribe(medicineSales => {
      console.log("list thuốc bán: " + medicineSales)
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
    console.log(this.invoiceForm.value);
    let quantityChoice = this.invoiceForm.value.quantity;
    let unitChoice = this.invoiceForm.value.unit;
    let priceChoice = 1;
    if (unitChoice == 'vien') {
      priceChoice = Math.floor(1 * this.invoiceForm.value.medicineSale.retailPrice);
    } else if (unitChoice == 'vi') {
      priceChoice = Math.floor(10 * this.invoiceForm.value.medicineSale.retailPrice);
    } else if (unitChoice == 'hop') {
      priceChoice = Math.floor(100 * this.invoiceForm.value.medicineSale.retailPrice);
    }
    let moneyChoice = quantityChoice * priceChoice
    let medicine: any = {
      medicineId: this.invoiceForm.value.medicineSale.medicineId,
      medicineName: this.invoiceForm.value.medicineSale.medicineName,
      retailPrice: priceChoice,
      quantity: quantityChoice,
      unit: unitChoice,
      money: moneyChoice,
      checkFlag: false,
    };
    this.listMedicineChoice.push(medicine);
    console.log("List thuốc thêm: " + this.listMedicineChoice);
    this.getTotalMoney();
    this.resetForm();
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
    this.retailService.createRetailInvoice(invoiceDto).subscribe(
      () => {
        console.log("success");
        this.listMedicineChoice = [];
      }, error => {
        console.log(error)
      }
    )
  }


  /*
* Created by DaLQA
* Time: 10:30 AM 3/07/2022
* Function: function selectMedicine
* */
  selectMedicine($event: any, item: any, i: any) {
    this.selectRow = i;
    this.index = i;
    this.deleteMedicineChoiceArr = this.deleteMedicineChoiceArr.push(item.medicineId);
    console.log(this.deleteMedicineChoiceArr);
    this.idDelete = item.medicineId;
    this.nameDelete = item.medicineName;
    console.log(this.deleteMedicineChoiceArr[i].checkFlag);
  }


  /*
 * Created by DaLQA
 * Time: 10:30 AM 3/07/2022
 * Function: function deleteMedicine
 * */
  deleteMedicine(closeModal: HTMLButtonElement) {
    for (let idDelete of this.deleteMedicineChoiceArr) {
      this.listMedicineChoice = this.listMedicineChoice.filter((item) => {
        return item.medicineId != idDelete;
      })
    }
    this.deleteMedicineChoiceArr = [];
    console.log(this.listMedicineChoice);
    this.getTotalMoney();
    closeModal.click();
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
    if (this.activeProjectIndex != k){
      this.flagHover = true;
    }else{
      this.flagHover = !this.flagHover;
    }
    this.activeProjectIndex = k;
    if (this.flagHover == true){
      this.idDelete = item.medicineId;
      this.deleteMedicineChoiceArr = this.deleteMedicineChoiceArr.push(item.medicineId);
      console.log(this.deleteMedicineChoiceArr);
    }else{
      this.idDelete = '';
    }
  }
}

