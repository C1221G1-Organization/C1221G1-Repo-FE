import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportListComponent} from './report-list/report-list.component';
import {StatistitalChartComponent} from './statistital-chart/statistital-chart.component';


const routes: Routes = [
  {path: 'report', component: ReportListComponent},
  {path: 'static', component: StatistitalChartComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
