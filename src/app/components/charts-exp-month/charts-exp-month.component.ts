import { Component, OnInit } from '@angular/core';
import { ImportsService } from 'src/app/pages/order-import/imports.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-exp-month',
  templateUrl: './charts-exp-month.component.html',
  styleUrls: ['./charts-exp-month.component.css']
})
export class ChartsExpMonthComponent implements OnInit {
  result:any;
  month:any;
  amount:any;
  chart:any = [];

  constructor(
    private expanse:ImportsService
  ) { }

  ngOnInit(): void {
    this.expanse.sixMonthExpanse().subscribe(res => {
      this.result = res;
      this.month = this.result.map((exp:any) => exp._id);
      this.amount = this.result.map((exp:any) => exp.totalExpanseAmount);
      this.chart = new Chart('sixmonthExpanse', {
        type:'bar',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.amount,
              borderColor: 'rgb(255, 99, 132)',
              label: 'ລາຍຈ່າຍ',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      })
    })
  }

}
