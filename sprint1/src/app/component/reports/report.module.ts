import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import {StatistitalChartComponent} from "./statistital-chart/statistital-chart.component";
import {ReportListComponent} from "./report-list/report-list.component";


@NgModule({
  declarations: [
    StatistitalChartComponent,
    ReportListComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
