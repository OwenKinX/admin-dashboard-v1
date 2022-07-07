import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImportsService } from '../../order-import/imports.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-rep-imp',
  templateUrl: './rep-imp.component.html',
  styleUrls: ['./rep-imp.component.css']
})
export class RepImpComponent implements OnInit {

  @ViewChild('importTable') importTable!:ElementRef;

  importList:any = [];
  grandTotal:number = 0;
  grandQty:number = 0;

  fileName:string = 'ProductSheets';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນສິນຄ້າ';
  dateTime:Date;

  constructor(
    private service:ImportsService
  ) { }

  ngOnInit(): void {

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });
  }

  exportExcel(){
    let element = document.getElementById('import-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('importTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 0, position, fileWidth, fileHeight);
      PDF.save(`${Date.now()}-${this.fileNameLao}.pdf`);
    })
  }

  filterReport(date:any){
    this.service.filterImpReport(date).subscribe(res=> {
      this.importList = res;
      this.grandTotal = this.importList.reduce(function(acc:any, val:any){
        return acc += val.price*val.qty;
      },0);

      this.grandQty = this.importList.reduce(function(acc:any, val:any){
        return acc += val.qty;
      },0);
    })
  }

  displayReports(){
    this.service.getImpReport().subscribe((res) => {
      this.importList = res;
      this.grandTotal = this.importList.reduce(function(acc:any, val:any){
        return acc += val.price*val.qty;
      },0);

      this.grandQty = this.importList.reduce(function(acc:any, val:any){
        return acc += val.qty;
      },0);
    });
  }

  emptyImpReport(){
    this.importList = [];
    this.grandTotal = 0;
  }
}
