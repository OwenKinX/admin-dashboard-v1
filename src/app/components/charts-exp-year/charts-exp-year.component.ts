import { Component, OnInit } from '@angular/core';
import { ImportsService } from 'src/app/pages/order-import/imports.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-charts-exp-year',
  templateUrl: './charts-exp-year.component.html',
  styleUrls: ['./charts-exp-year.component.css']
})
export class ChartsExpYearComponent implements OnInit {
  result:any;
  month:any;
  amount:any;
  chart:any = [];

  constructor(
    private expanse:ImportsService
  ) { }

  ngOnInit(): void {
    this.expanse.yearlyExpanseReport().subscribe(res => {
      this.result = res;
      this.month = this.result.map((exp:any) => exp._id)
      this.amount = this.result.map((exp:any) => exp.totalExpanseAmount)

      this.chart = new Chart('yearExpanse', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              label:'ລາຍຈ່າຍ',
              data: this.amount,
              tension: 0.1,
              fill: 'false',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
            }
          ]
        },
        options: {
          scales: {
            y:{
              beginAtZero: true
            }
          }
        }
      })
    })
  }

}
