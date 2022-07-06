import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ReportService} from '../../../service/report.service';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reportForm: FormGroup;

  constructor(private reportService: ReportService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

}
