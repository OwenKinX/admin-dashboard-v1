import { Component, OnInit } from '@angular/core';
import { SaleDetailService } from 'src/app/pages/sales-services/saleDetail.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  result:any;
  date:any;
  amount:any;
  chart:any = [];

  // get crypto chart rate
  // datas:any;
  // coinPrice: any;
  // coinName: any;
  // cryptoChart:any = [];

  constructor(
    private income:SaleDetailService
  ) {}

  ngOnInit(): void {

    this.income.dailyIncomeReport().subscribe(res => {
      this.result = res;
      this.date = this.result.map((incomes:any) => incomes._id);
      this.amount = this.result.map((incomes:any) => incomes.totalIncomeAmount);
      this.chart = new Chart('dailyIncome', {
        type: 'bar',
        data: {
          labels: this.date,
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
              y: {
                  beginAtZero: true
              }
          }
        }
      });
    });

    // this.income.cryptoData().subscribe( crypto => {
    //   this.datas = crypto;
    //   this.coinPrice = this.datas.data.coins.map((coins: any) => coins.price);
    //   this.coinName = this.datas.data.coins.map((coins: any) => coins.name);
    //   console.log(this.coinPrice);
    //   console.log(this.coinName);
    // })

    }

}
