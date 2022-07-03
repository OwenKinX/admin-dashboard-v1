import { Component, OnInit } from '@angular/core';
import { SaleDetailService } from 'src/app/pages/sales-services/saleDetail.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-month',
  templateUrl: './charts-month.component.html',
  styleUrls: ['./charts-month.component.css']
})
export class ChartsMonthComponent implements OnInit {
  result:any;
  month:any;
  amount:any;
  chart:any = [];

  constructor(
    private income:SaleDetailService
  ) { }

  ngOnInit(): void {

    this.income.sixmonthIncomeReport().subscribe(res => {
      this.result = res;
      this.month = this.result.map((incomes:any) => incomes._id);
      this.amount = this.result.map((incomes:any) => incomes.totalIncomeAmount);
      this.chart = new Chart('sixmonthIncome', {
        type: 'bar',
        data: {
          labels: this.month,
          datasets: [
            {
              data: this.amount,
              borderColor: 'rgb(75, 192, 192)',
              label: 'ລາຍຮັບ',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2
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
      });
    })
  }

}
