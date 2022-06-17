import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts-month',
  templateUrl: './charts-month.component.html',
  styleUrls: ['./charts-month.component.css']
})
export class ChartsMonthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    new Chart("myChart", {
        type: 'bar',
        data: {
          labels: ['ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖູນາ'],
          datasets: [
            {
              label: 'ລາຍຮັບ 6 ເດືອນ',
              data: [12, 14, 13, 10, 12, 16],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'ລາຍຈ່າຍ 6 ເດືອນ',
              data: [10, 12, 12, 9, 12, 14],
                backgroundColor: 'rgba(215, 89, 89, 0.5)',
                borderColor: 'rgba(215, 89, 89, 1)',
              borderWidth: 1
            },
          ]
        },
        options: {
          responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
              title: {
                display: true,
                text: 'x 1,000,000',
                align: 'start'
              },
              legend: {
                  labels: {
                      font: {
                          size: 12
                      }
                  }
              }
          }
        }
    });
  }

}
