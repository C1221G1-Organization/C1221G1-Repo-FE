import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {InvoiceWholesaleAndRefundService} from "../../../../service/invoiceWholesaleAndRefund.service";
import {InvoiceMedicine} from "../../../../model/invoice-medicine";
import {MedicineStorageDto} from "../../../../dto/medicine-storage-dto";
import {ListMedicineDto} from "../../../../dto/list-medicine-dto";
import {ToastrService} from "ngx-toastr";
import {Customer} from "../../../../model/customer";

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
  totalMoney: number;
  note: string;
  customer: string;
  activeProjectIndex: number;
 flagHover: boolean;
  idDelete: string;
  nameDelete: string;
  deleteMedicineChoiceArr: any[];
  flag: Boolean;
  createDate = new Date()
  customerList: Customer[] = []
  constructor(private invoiceService: InvoiceWholesaleAndRefundService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCustomer()
    this.invoiceService.getAll().subscribe(medicines => {
      this.medicines = medicines;
    });
    this.invoiceForm = new FormGroup({
      customer: new  FormControl(''),
      employee: new FormControl('',[Validators.required]),
      createDate: new FormControl(Date.now()),
      invoiceNote: new FormControl(''),
      typeOfInvoice: new FormControl('Bán sỉ')
    })
    this.invoiceMedicineForm = new FormGroup({
      invoiceMedicine: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  addMedicine() {
      console.log(this.invoiceMedicineForm.value)
      let quantityMedicine = this.invoiceMedicineForm.value.quantity;
      let money = 50 * quantityMedicine * this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineWholesaleProfit;
      let idChoice = this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineId;
      let nameChoice = this.invoiceMedicineForm.value.invoiceMedicine.medicine.medicineName;
      let medicine: any = {
        medicineId: idChoice,
        medicineName: nameChoice,
        quantity: quantityMedicine,
        newMoney: money,
        checkFlag: false,
      };
    const myArray = this.listMedicine;
    const test = myArray.filter(data => data.medicineId == medicine.medicineId && medicine.medicineId != '')
    if (idChoice == '' || nameChoice == '' || quantityMedicine == ''
      || test.length > 0 || quantityMedicine < 1) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    if (!this.flag) {
      this.listMedicine.push(medicine);
    } else {
    }
      console.log(this.listMedicine);
      this.getTotalMoney();
      this.resetForm();
    }

  getTotalMoney() {
    this.totalMoney = 0;
    for (let item of this.listMedicine) {
      this.totalMoney += item.newMoney;
    }
  }

  private resetForm() {
    this.invoiceMedicineForm = new FormGroup({
      invoiceMedicine: new FormControl('',[Validators.required]),
      quantity: new FormControl('',[Validators.required])
    })
    this.getTotalMoney()
  }

  createInvoice() {
  for(let medicine of this.listMedicine){
   let invoiceMedicine: any ={
      medicineId: medicine.medicineId,
      quantity: medicine.quantity * 50
    }
    this.invoiceMedicineList.push(invoiceMedicine);
  }
  let invoice: any = {
    employeeId: 'NV-0001',
    customerId: this.customer,
    invoiceNote: this.note,
    invoiceMedicineList: this.invoiceMedicineList
  }
    if (invoice.invoiceMedicineList == []){
      this.toastr.warning("Bạn chưa chọn thuốc !", "Hóa Đơn Bán Lẻ", {
        timeOut: 3000,
        progressBar: true
      });
    }else {this.invoiceService.createInvoice(invoice).subscribe(
      () => {
        this.toastr.success("Thêm mới thành công !", "Hóa đơn bán sỉ",{
          timeOut:3000,
          progressBar: true
        })
        this.listMedicine = [];
      }, error => {
        this.toastr.warning("Thêm Mới Thất Bại, Nhập đầy đủ thông tin", "Hóa đơn bán sỉ", {
          timeOut:3000,
          progressBar: true
        });
        console.log(error)
      }
    )}

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
      console.log(this.idDelete);
    } else {
      this.idDelete = '';
      console.log(this.idDelete);
    }
  }
  deleteMedicine(closeModal: HTMLButtonElement) {
    this.listMedicine = this.listMedicine.filter(
      (item) => {
        return item.medicineId != this.idDelete;
        this.resetIdAndName();
      })
    this.deleteMedicineChoiceArr = [];
    console.log(this.invoiceMedicineList);
    this.getTotalMoney();
    closeModal.click();
  }

  resetIdAndName() {
    this.idDelete = '';
    this.nameDelete = '';
  }

  getAllCustomer(){
    this.invoiceService.getCustomer().subscribe(customer =>{
        this.customerList = customer;
    })
  }
}
