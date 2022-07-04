import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {InvoiceService} from "../../../../service/invoice.service";
import {MedicineService} from "../../../../service/medicine.service";
import {Medicine} from "../../../../module/medicine";
import {InvoiceMedicine} from "../../../../module/invoice-medicine";
import {MedicineStorageDto} from "../../../../dto/medicine-storage-dto";
import {ListMedicineDto} from "../../../../dto/list-medicine-dto";

@Component({
  selector: 'app-wholesale',
  templateUrl: './wholesale.component.html',
  styleUrls: ['./wholesale.component.css']
})
export class WholesaleComponent implements OnInit {
  invoiceForm: FormGroup;
  medicines: MedicineStorageDto[] = [];
  quantity: number;
  invoiceMedicine: InvoiceMedicine;
  invoiceMedicineList: InvoiceMedicine[] =[];
  listMedicine: ListMedicineDto[] = [];
  invoiceMedicineForm: FormGroup;
  private totalMoney: number;

  constructor(private invoiceService: InvoiceService) {
  }

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe(medicines => {
      this.medicines = medicines;
    });
    this.invoiceForm = new FormGroup({
      customer: new  FormControl(''),
      employee: new FormControl(''),
      createDate: new FormControl(Date.now()),
      invoiceNote: new FormControl(''),
      typeOfInvoice: new FormControl('Ban si')
    })
    this.invoiceMedicineForm = new FormGroup({
      invoiceMedicine: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  addMedicine() {
      console.log(this.invoiceMedicineForm.value)
      let quantityMedicine = this.invoiceMedicineForm.value.quantity;
      let money = quantityMedicine * this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineWholesaleProfit;
      let medicine: any = {
        medicineId: this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineId,
        medicineName: this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineName,
        quantity: quantityMedicine,
        newMoney: money,
        checkFlag: false,
      };
      this.listMedicine.push(medicine);
      console.log(this.listMedicine);
      this.getTotalMoney();
      this.resetForm();
    }

  getTotalMoney() {
    this.totalMoney = 0;
    for (let item of this.listMedicine) {
      this.totalMoney += item.newMoney;
      console.log(item.newMoney)
      console.log(this.totalMoney)
    }
  }

  private resetForm() {
    this.invoiceMedicineForm = new FormGroup({
      invoiceMedicine: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  createRetailInvoice() {

  }
}
