import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImportsService } from 'src/app/pages/order-import/imports.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';

const date = new Date().toLocaleString();

@Component({
  selector: 'app-expanse-table',
  templateUrl: './expanse-table.component.html',
  styleUrls: ['./expanse-table.component.css']
})
export class ExpanseTableComponent implements OnInit {

  @ViewChild('expanseTable') expanseTable!:ElementRef;

  expanseReportList:any = [];
  grandTotal:number = 0;
  grandQty:number = 0;

  fileName:string = 'ExpanseSheets';
  fileNameLao:string = 'ລາຍງານລາຍຈ່າຍ';
  dateTime:Date;

  month_temp:any;
  monthly:any;

  constructor(
    private expanse:ImportsService
  ) { }

  ngOnInit(): void {
    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });
  }

  exportExcel(){
    let element = document.getElementById('expanse-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${date}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('expanseTable');
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

  onQueryExpanse(month:any){
    this.expanse.monthlyExpanseReport(month).subscribe(report => {
      this.expanseReportList = report;
      this.expanseReportList.forEach((a:any) => {
        Object.assign(a, {desc: 'ລາຍຈ່າຍຈາກການນຳເຂົ້າສິນຄ້າ'})
      })
      this.month_temp = this.expanseReportList.map((m:any) => m.month);
      this.monthly = this.month_temp[0];

      this.grandTotal = this.expanseReportList.reduce(function(acc:any, val:any){
        return acc += val.expanseTotal;
      },0);

      this.grandQty = this.expanseReportList.reduce(function(acc:any, val:any){
        return acc += val.totalQty;
      },0);
    })
  }

  onCancel(){
    this.expanseReportList = [];
    this.grandTotal = 0;
    this.grandQty = 0;
  }
}
