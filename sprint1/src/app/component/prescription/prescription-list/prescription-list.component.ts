import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Prescription} from '../../../models/prescription/prescription';
import {PrescriptionService} from '../../../services/prescription/prescription.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {
  // @ViewChild('ids') ids: ElementRef;
  prescriptions: Prescription[] = [];
  ids: string;
  name: string;
  id = '';
  names = '';
  target = '';
  symptom = '';
  // prescriptionName = '';
  page: any;
  totalPages = 0;
  pageSize: 0;
  firsts: boolean;
  last: boolean;
  message: boolean;
  activeProjectIndex: number;
  flag = false;
  nameDelete: string;
  idClick = '';
  searchForm: FormGroup;

  constructor(private prescriptionService: PrescriptionService,
              private router: Router,
              private toastr: ToastrService) {
    this.searchForm = new FormGroup({
      typeSearch: new FormControl(''),
      inputSearch: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllPrescription();
    // this.prescriptionService.searchPrescriptionId('').subscribe(prescription => {
    //   this.prescription = prescription;
    // });
  }

  getAllPrescription() {
    this.prescriptionService.getAllPrescription(this.page, '', '', '', '').subscribe((data: any) => {
      this.prescriptions = data.content;
      this.page = data.number;
      this.totalPages = data.totalPages;
      this.pageSize = data.pageable.pageSize;
      this.firsts = data.first;
      this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
    }, error => {
      this.message = true;
    });
  }

  search() {
    const input = this.searchForm.get('inputSearch').value;
    const type = this.searchForm.get('typeSearch').value;
    if (type === 'id' && input.trim() !== '') {
      this.prescriptionService.getAllPrescription(this.page, this.id = input.trim(), '', '', '').subscribe(
        (data: any) => {
          this.message = false;
          this.prescriptions = data.content;
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          this.message = true;
          this.prescriptions = null;
          this.page = 0;
          this.totalPages = 0;
          console.log(err);
        }
      );
    } else if (type === 'names' && input.trim() !== '') {
      this.prescriptionService.getAllPrescription(this.page, this.id = '', this.names = input.trim(),
        this.target = '', this.symptom = '').subscribe(
        (data: any) => {
          this.message = false;
          this.prescriptions = data.content;
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          this.message = true;
          this.prescriptions = null;
          this.page = 0;
          this.totalPages = 0;
          console.log(err);
        }
      );
    } else if (type === 'target' && input.trim() !== '') {
      this.prescriptionService.getAllPrescription(this.page, this.id = '', this.names = '',
        this.target = input.trim(), this.symptom = '').subscribe(
        (data: any) => {
          this.message = false;
          this.prescriptions = data.content;
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          this.message = true;
          this.prescriptions = null;
          this.page = 0;
          this.totalPages = 0;
          console.log(err);
        }
      );
    } else if (type === 'symptom' && input.trim() !== '') {
      this.prescriptionService.getAllPrescription(this.page, this.id = '', this.names = '',
        this.target = '', this.symptom = input.trim()).subscribe(
        (data: any) => {
          this.message = false;
          this.prescriptions = data.content;
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          this.message = true;
          this.prescriptions = null;
          this.page = 0;
          this.totalPages = 0;
          console.log(err);
        }
      );
      //   tslint:disable-next-line:triple-equals
    } else if (input.trim() == '') {
      this.prescriptionService.getAllPrescription(this.page, this.id = '', this.names = '',
        this.target = '', this.symptom = '').subscribe(
        (data: any) => {
          this.message = false;
          this.prescriptions = data.content;
          this.page = data.number;
          this.totalPages = data.totalPages;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
          console.log(this.prescriptions);
        }, err => {
          this.message = true;
          console.log(err);
        });
    }
  }

  previous() {
    if (this.page > 0) {
      this.prescriptionService.getAllPrescription(this.page - 1, this.id = '',
        this.names = '', this.target = '', this.symptom = '').subscribe(
        (data: any) => {
          this.prescriptions = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  next() {
    if (this.page < this.totalPages - 1) {
      this.prescriptionService.getAllPrescription(this.page + 1, this.id = '', this.names = '',
        this.target = '', this.symptom = '').subscribe(
        (data: any) => {
          this.prescriptions = data.content;
          this.page = data.number;
          this.firsts = data.first;
          this.last = (data.pageable.offset + data.pageable.pageSize) >= data.totalElements;
        }, err => {
          console.log(err);
        }
      );
    }
  }

  // public activeProject(index: number, id: string, namePrescription: string): void {
  //   if (this.activeProjectIndex !== index) {
  //     this.flag = true;
  //   } else {
  //     this.flag = !this.flag;
  //   }
  //   this.activeProjectIndex = index;
  //   if (this.flag === true) {
  //     this.nameDelete = namePrescription;
  //     this.idClick = id;
  //   } else {
  //     this.idClick = null;
  //   }
  //
  // }

  getPrescription(ids: string, name: string) {
    this.ids = ids;
    this.name = name;
  }

  delete(ids: string) {
    this.prescriptionService.deletePrescription(ids).subscribe(() => {
      this.toastr.success('Đã Xoá Thành Công !', 'Thông báo', {
        timeOut: 3000,
        progressBar: true
      });
      this.ngOnInit();
    }, e => {
      console.log(e);
    }, () => {
      this.router.navigate(['/prescription/list']);
    });
  }




  // clickEdit(errorButton: HTMLButtonElement) {
  //   if (this.idClick) {
  //     this.router.navigate(['/employee/edit/', this.idClick]);
  //   } else {
  //     errorButton.click();
  //   }
  // }


}
