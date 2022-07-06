import {Component, OnInit} from '@angular/core';
import {ReportService} from "../../../service/report.service";
import {Static} from "../../../model/static";
import {Chart, registerables} from 'chart.js';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// @ts-ignore
import * as $ from "jquery";

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
  show = false;
  showYear: string;
  staticForm: FormGroup;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.staticForm = new FormGroup({
      year: new FormControl('', [Validators.required]),
    });
  }

  change(value: any) {
    switch (value) {
      case '1':
        this.year = false;
        this.month = true;
        break;
      case '2':
        this.year = true;
        this.month = false;
        break;
      default:
        this.year = true;
        this.month = true;
    }
  }

  submit() {
    this.reportService.getStatic(this.staticForm.value.year).subscribe(statics => {
      this.showYear = this.staticForm.value.year;
      if (this.showYear !== '' && this.showYear !== null) {
        this.show = true;
      } else {
        this.show = false;
      }
      console.log(statics);
      this.statics = statics;
      $('#myChart').remove(); // this is my <canvas> element
      $('#containChart').append('<canvas style="width: 100%" id="myChart"><canvas>');
      this.canvas = document.getElementById('myChart');
      this.ctx = this.canvas.getContext('2d');
      const myChart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'
            , 'Tháng 11', 'Tháng 12'],
          datasets: [
            {
              label: 'Doanh thu',
              data: [statics[0].revenue, statics[1].revenue, statics[2].revenue, statics[3].revenue
              , statics[4].revenue, statics[5].revenue, statics[6].revenue, statics[7].revenue
              , statics[8].revenue, statics[9].revenue, statics[10].revenue, statics[11].revenue],
              borderColor: 'limegreen',
              backgroundColor: [
                'limegreen'
              ],
              borderWidth: 1
            },
            {
              label: 'Lợi nhuận',
              data: [statics[0].profit, statics[1].profit, statics[2].profit, statics[3].profit
                , statics[4].profit, statics[5].profit, statics[6].profit, statics[7].profit
                , statics[8].profit, statics[9].profit, statics[10].profit, statics[11].profit],
              borderColor: 'violet',
              backgroundColor: [
                'violet'
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
