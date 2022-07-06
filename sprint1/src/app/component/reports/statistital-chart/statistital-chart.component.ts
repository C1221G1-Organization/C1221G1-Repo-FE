import { Component, OnInit } from '@angular/core';
import {Static} from "../../../model/static";
import {FormGroup} from "@angular/forms";
import {ReportService} from "../../../service/report.service";

@Component({
  selector: 'app-statistital-chart',
  templateUrl: './statistital-chart.component.html',
  styleUrls: ['./statistital-chart.component.css']
})
export class StatistitalChartComponent implements OnInit {
  statics: Static[] = [];
  public year = true;
  public month = true;
  canvas: any;
  ctx: any;
  show = false;
  showYear: string;
  staticForm: FormGroup;

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

}
