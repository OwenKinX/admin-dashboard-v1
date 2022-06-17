import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SaleDetailService } from '../../sales-services/saleDetail.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';

@Component({
  selector: 'app-rep-income',
  templateUrl: './rep-income.component.html',
  styleUrls: ['./rep-income.component.css']
})
export class RepIncomeComponent implements OnInit {

  @ViewChild('incomeTable', {static:false}) el!: ElementRef;

  monthlyIncome:any = [];
  yearIncome:any = [];

  fileName:string = 'IncomeSheets.xlsx';
  fileNameLao:string = 'ລາຍງານລາຍຮັບ';
  today:any;
  dateTime:Date;

  constructor(
    private incomeReport:SaleDetailService
  ) { }

  ngOnInit(): void {
    //month income report
    this.incomeReport.monthIncomeReport().subscribe(res => {
      this.monthlyIncome = res;
    });

    //year income report
    this.incomeReport.yearIncomeReport().subscribe(res => {
      this.yearIncome = res;
    })

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })
  }

  exportExcel(){
    let element = document.getElementById('income-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}`);
  }

  exportPDF(){
    let pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.save(`${Date.now()}-ລາຍງານລາຍຮັບ.pdf`)
      }
    })
  }

}
