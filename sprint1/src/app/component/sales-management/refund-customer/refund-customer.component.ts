import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InvoiceWholesaleAndRefundService} from "../../../service/invoiceWholesaleAndRefund.service";
import {InvoiceDto} from "../../../dto/invoice-dto";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MedicineOfInvoiceDto} from "../../../dto/medicine-of-invoice-dto";
import {ListMedicineDto} from "../../../dto/list-medicine-dto";
import {InvoiceMedicine} from "../../../model/invoice-medicine";


@Component({
  selector: 'app-refund-customer',
  templateUrl: './refund-customer.component.html',
  styleUrls: ['./refund-customer.component.css']
})
export class RefundCustomerComponent implements OnInit {
  invoice: InvoiceDto;
  createDate = new Date()
  total: number;
  medicineOfInvoiceList: MedicineOfInvoiceDto[] = [];
  searchInvoice: string;
  listMedicine: ListMedicineDto[] = []
  invoiceMedicineList: InvoiceMedicine[] =[];
  quantityRefund: number[] = [];
  medicineRefundList: MedicineOfInvoiceDto[] = [];
  isShowMedicineList: boolean;
  invoiceForm: FormGroup;
  medicineList: MedicineOfInvoiceDto[] = [];
  medicineCurrent: MedicineOfInvoiceDto;
  invoiceMedicineSelectedArray: FormArray;
  flagNoMedicine = true
  constructor(private invoiceService: InvoiceWholesaleAndRefundService,private fb: FormBuilder,) {
    this.invoiceForm = this.fb.group({
      medicineRefundList: this.fb.array(this.medicineList
        .map(invoiceMedicine => this.addNewMedicineRefund(invoiceMedicine)))
    })
  }

  ngOnInit(): void {


  }


  search() {
    this.invoiceService.search(this.searchInvoice).subscribe(data =>{
      this.invoice = data;
      if (data == null){
        this.total = 0;
      }
    })
    console.log(this.invoice)
    console.log(this.searchInvoice)
  }
  get medicineRefundListSelected(): FormArray {
    this.invoiceMedicineSelectedArray = this.invoiceForm.get('importInvoiceMedicineList') as FormArray;
    return this.invoiceMedicineSelectedArray;
  }


  createInvoice() {
    for(let medicine of this.medicineOfInvoiceList){
      let invoiceMedicine: any ={
        medicineId: medicine.medicine.medicineId,
        quantity: this.quantityRefund
      }
      this.invoiceMedicineList.push(invoiceMedicine);
    }
    let invoice: any = {
      employeeId: 'NV-0001',
      customerId: this.invoice.customer.customerId,
      invoiceMedicineList: this.medicineRefundList,
    }
    this.invoiceService.createRefundInvoice(invoice).subscribe(
      () => {
        console.log("success");
        this.listMedicine = [];
      }, error => {
        console.log(error)
      }
    )
  }

  showChooseMedicine() {
    this.isShowMedicineList = !this.isShowMedicineList;
    this.invoiceService.getInvoiceMedicine(this.searchInvoice).subscribe(invoiceMedicine =>{
      this.medicineOfInvoiceList = invoiceMedicine;
    })
  }

  importMedicine(medicine: any) {
    this.isShowMedicineList = !this.isShowMedicineList;
    this.medicineCurrent = medicine;
    const invoiceRefund = this.addNewMedicineRefund(this.medicineCurrent);
    this.medicineRefundListSelected.push(invoiceRefund);
  }

  private addNewMedicineRefund(invoiceMedicine: MedicineOfInvoiceDto) {
    return this.fb.group({
      medicineName: [invoiceMedicine.medicine.medicineName],
      quantityRefund: '',
      medicineUnit: 'Hộp',
      intoMoney: 0,
      price: [invoiceMedicine.medicine.medicineWholesaleProfit * invoiceMedicine.medicine.medicineImportPrice]
    })
  }
}
