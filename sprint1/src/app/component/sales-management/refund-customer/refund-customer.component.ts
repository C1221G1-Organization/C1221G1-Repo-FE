import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InvoiceWholesaleAndRefundService} from "../../../service/invoiceWholesaleAndRefund.service";
import {InvoiceDto} from "../../../dto/invoice-dto";
import {FormControl, FormGroup} from "@angular/forms";
import {Employee} from "../../../model/employee/employee";
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

  constructor(private invoiceService: InvoiceWholesaleAndRefundService) {
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
    this.medicineRefundList.push(medicine)
  }

}
