import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SaleDetailService } from '../../sales-services/saleDetail.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { timer } from 'rxjs';

@Component({
  selector: 'app-rep-sales',
  templateUrl: './rep-sales.component.html',
  styleUrls: ['./rep-sales.component.css']
})
export class RepSalesComponent implements OnInit {

  @ViewChild('saleTable') saleTable!:ElementRef;

  saleDetailReportList:any = [];
  grandTotal:number = 0;

  fileName:string = 'SaleSheets';
  fileNameLao:string = 'ລາຍງານການຂາຍ';
  dateTime:Date;

  constructor(
    private slDetailService:SaleDetailService
  ) { }

  ngOnInit(): void {
    
    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });
  }

  exportExcel(){
    let element = document.getElementById('sale-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('saleTable');
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

  showAllReport(){
    this.slDetailService.SaleDetailReport().subscribe((res) => {
      this.saleDetailReportList = res;
      this.grandTotal = this.saleDetailReportList.reduce(function(acc:any, val:any){
        return acc += val.price*val.qty;
      },0);
    });
  }

  onQueryReport(startdate:any, lastdate:any){
    this.slDetailService.SaleDetailReportByQueryString(startdate,lastdate).subscribe(res => {
      this.saleDetailReportList = res;
      // for(let i=0; i<this.saleDetailReportList.length; i++){
      //   this.grandTotal = this.saleDetailReportList.reduce(function(acc:any, val:any){
      //     return acc +=val.price*val.qty;
      //   },0)
      // }
      this.grandTotal = this.saleDetailReportList.reduce(function(acc:any, val:any){
        return acc +=val.price*val.qty;
      },0)
    });
  }

  onCancel(){
    this.saleDetailReportList = [];
    this.grandTotal = 0;
  }

}
