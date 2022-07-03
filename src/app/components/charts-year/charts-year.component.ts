import { Component, OnInit } from '@angular/core';
import { SaleDetailService } from 'src/app/pages/sales-services/saleDetail.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-year',
  templateUrl: './charts-year.component.html',
  styleUrls: ['./charts-year.component.css']
})
export class ChartsYearComponent implements OnInit {
  result:any;
  month:any;
  amount:any;
  chart:any = [];

  constructor(
    private income:SaleDetailService
  ) { }

  ngOnInit(): void {
    this.income.yearlyIncomeReport().subscribe(res => {
      this.result = res;
      this.month = this.result.map((incomes:any) => incomes._id);
      this.amount = this.result.map((incomes:any) => incomes.totalIncomeAmount);

      this.chart = new Chart('yearIncome', {
        type: 'line',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.amount,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointBackgroundColor: 'rgb(75, 192, 192)',
              label: 'ລາຍຮັບ',
              tension: 0.1,
              fill: 'false',
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 15
            },
          ],
        },
        options: {
          scales: {
            y:{
              beginAtZero: true
            }
          }
        }
      })
    });
  }

}
