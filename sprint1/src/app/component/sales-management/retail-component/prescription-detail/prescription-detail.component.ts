import {Component, Input, OnInit} from '@angular/core';
import {SharedServiceService} from "../../../../service/shared-service.service";
import {PrescriptionDetail} from "../../../../dto/prescription/prescriptionDetail";
import {PrescriptionMedicineDetail} from "../../../../dto/prescription/prescriptionMedicineDetail";
import {RetailService} from "../../../../service/retail.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MedicineSale} from "../../../../dto/invoice/medicineSale";
import {InvoiceMedicineDto} from "../../../../dto/invoice/invoiceMedicineDto";
import {ListMedicineChoice} from "../../../../dto/invoice/listMedicineChoice";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-prescription-detail',
  templateUrl: './prescription-detail.component.html',
  styleUrls: ['./prescription-detail.component.css']
})
export class PrescriptionDetailComponent implements OnInit {
  presciptionForm: FormGroup;
  idChoice: string;
  prescriptionDetail: PrescriptionDetail;
  listPrescriptionMedicine: PrescriptionMedicineDetail[] = [];
  medicineSales: MedicineSale[] = [];
  invoiceMedicineDtos: InvoiceMedicineDto[] = [];
  listMedicineChoice: ListMedicineChoice[] = [];
  note: string;
  localDateTime: any;
  totalMoney = 0;

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
    // this.presciptionForm = new FormGroup({
    //   medicineId: new FormControl('', [Validators.required]),
    //   medicineName: new FormControl('', [Validators.required]),
    //   quantity: new FormControl('',[Validators.required]),
    //   retailPrice: new FormControl('',[Validators.required])
    // })
  }

  getPrescriptionDetail(prescriptionId: string) {
    this.retailService.getPrescriptionDetail(prescriptionId).subscribe(res => {
      this.prescriptionDetail = res;
      console.log(this.prescriptionDetail);
    })
  }

  getPrescriptionMedicineDetail(prescriptionId: string) {
    this.retailService.getPrescriptionMedicineDetail(prescriptionId).subscribe(res => {
      this.listPrescriptionMedicine = res;
      console.log(res);
    })
  }

  createRetailInvoice() {
    for (let medicine of this.listPrescriptionMedicine) {
      let invoiceMedicineDto: any = {
        medicineId: medicine.medicineId,
        quantity: medicine.totalQuantity
      }
      this.invoiceMedicineDtos.push(invoiceMedicineDto);
      let invoiceDto: any = {
        customerId: 'KH-0001',
        employeeId: 'NV-0001',
        invoiceNote: 'no comment',
        invoiceMedicineList: this.invoiceMedicineDtos
      };
      console.log(invoiceDto);
      this.retailService.createRetailInvoice(invoiceDto).subscribe(
        () => {
          this.toastr.success("Thêm Mới Thành Công !", "Thông báo", {
            timeOut:3000,
            progressBar: true
          });
          this.router.navigateByUrl('/sales-management/retail');
          this.listMedicineChoice = [];
        }, error => {
          this.toastr.warning("Thêm Mới Thất Bại !", "Cảnh báo", {
            timeOut:3000,
            progressBar: true
          });
          this.listMedicineChoice = [];
          console.log(error)
        }
      )
    }
  }
}
