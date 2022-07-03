import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../service/report.service";
import {Static} from "../../model/static";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
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
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
  }

  change(value: any) {
    switch (value) {
      case '0':
        this.year = false;
        this.month = false;
        break;
      case '1':
        this.year = false;
        this.month = true;
        break;
      case '2':
        this.year = true;
        this.month = false;
        break;
    }
  }

  submit() {
    this.reportService.getStatic().subscribe(statics => {
      console.log(statics);
      this.statics = statics;

      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      const myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'
            , 'Tháng 11', 'Tháng 12'],
          datasets: [
            {
              label: 'Doanh thu',
              data: [statics[0].revenue, statics[1].revenue, statics[2].revenue, statics[3].revenue
              , statics[4].revenue, statics[5].revenue, statics[6].revenue, statics[7].revenue
              , statics[8].revenue, statics[9].revenue, statics[10].revenue, statics[11].revenue],
              borderColor: 'green',
              backgroundColor: [
                'green'
              ],
              borderWidth: 1
            },
            {
              label: 'Lợi nhuận',
              data: [statics[0].profit, statics[1].profit, statics[2].profit, statics[3].profit
                , statics[4].profit, statics[5].profit, statics[6].profit, statics[7].profit
                , statics[8].profit, statics[9].profit, statics[10].profit, statics[11].profit],
              borderColor: 'blue',
              backgroundColor: [
                'blue'
              ],
              borderWidth: 2
            },
          ]
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },

      });
    });
  }
}
