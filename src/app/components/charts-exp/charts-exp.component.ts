import { Component, OnInit } from '@angular/core';
import { ImportsService } from 'src/app/pages/order-import/imports.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-exp',
  templateUrl: './charts-exp.component.html',
  styleUrls: ['./charts-exp.component.css']
})
export class ChartsExpComponent implements OnInit {

  result:any;
  date:any;
  amount:any;
  chart:any = [];

  constructor(
    private expanse:ImportsService
  ) { }

  ngOnInit(): void {
    this.expanse.expanseDailyReport().subscribe(res => {
      this.result = res;
      this.date = this.result.map((exp:any) => exp._id);
      this.amount = this.result.map((exp:any) => exp.totalExpanseAmount);
      this.chart = new Chart('dailyExpanse', {
        type:'bar',
        data: {
          labels: this.date,
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
