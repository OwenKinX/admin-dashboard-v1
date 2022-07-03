import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SaleDetailService } from '../../pages/sales-services/saleDetail.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';

const date = new Date().toLocaleString();

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.css']
})
export class IncomeTableComponent implements OnInit {

  @ViewChild('incomeTable') incomeTable!:ElementRef;

  incomeReportList:any = [];
  grandTotal:number = 0;
  grandQty:number = 0;

  fileName:string = 'IncomeSheets';
  fileNameLao:string = 'ລາຍງານລາຍຮັບ';
  dateTime:Date;

  month_temp:any;
  monthly:any;

  constructor(
    private income:SaleDetailService
  ) { }

  ngOnInit(): void {
    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });
  }

  exportExcel(){
    let element = document.getElementById('income-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${date}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('incomeTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 300;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 0, position, fileWidth, fileHeight);
      PDF.save(`${Date.now()}-${this.fileNameLao}.pdf`);
    })
  }

  onQueryIncome(month:any){
    this.income.monthlyIncomeReport(month).subscribe(report => {
      this.incomeReportList = report;
      this.incomeReportList.forEach((a:any) => {
        Object.assign(a, {desc: 'ລາຍຮັບຈາກການຂາຍສິນຄ້າ'})
      });
      this.month_temp = this.incomeReportList.map((m:any) => m.month);
      this.monthly = this.month_temp[0];
      
      this.grandTotal = this.incomeReportList.reduce(function(acc:any, val:any){
        return acc += val.incomeTotal;
      },0);

      this.grandQty = this.incomeReportList.reduce(function(acc:any, val:any){
        return acc += val.totalQty;
      },0);
    })
  }

  onCancel(){
    this.incomeReportList = [];
    this.grandTotal = 0;
    this.grandQty = 0;
  }

}
