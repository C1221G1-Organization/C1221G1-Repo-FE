import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Prescription} from '../../../../model/prescription';
import {RetailService} from '../../../../service/retail.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-available-prescription-list',
  templateUrl: './available-prescription-list.component.html',
  styleUrls: ['./available-prescription-list.component.css']
})
export class AvailablePrescriptionListComponent implements OnInit {
  prescriptions: Prescription[] = [];
  id = '';
  names = '';
  target = '';
  symptom = '';
  page: number;
  totalPages: any;
  pageSize: any;
  firsts: boolean;
  last: boolean;
  message: boolean;
  activeProjectIndex: number;
  flagHover: boolean;
  idChoice: any;
  searchForm: FormGroup;

  constructor(private retailService: RetailService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
