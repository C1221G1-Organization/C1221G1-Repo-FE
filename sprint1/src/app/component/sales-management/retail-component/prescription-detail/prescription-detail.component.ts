import { Component, OnInit } from '@angular/core';
import {PrescriptionDetail} from "../../../../dto/prescription/prescriptionDetail";
import {PrescriptionMedicineDetail} from "../../../../dto/prescription/prescriptionMedicineDetail";
import {InvoiceMedicineDto} from "../../../../dto/invoice/invoiceMedicineDto";
import {ListMedicineChoice} from "../../../../dto/invoice/ListMedicineChoice";
import {RetailService} from "../../../../service/retail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


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
  }

}
