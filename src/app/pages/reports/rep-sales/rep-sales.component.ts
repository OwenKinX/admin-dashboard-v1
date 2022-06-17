import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SaleDetailService } from '../../sales-services/saleDetail.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';

@Component({
  selector: 'app-rep-sales',
  templateUrl: './rep-sales.component.html',
  styleUrls: ['./rep-sales.component.css']
})
export class RepSalesComponent implements OnInit {

  @ViewChild('saleTable', {static:false}) el!:ElementRef;

  saleDetailReportList:any = [];
  grandTotal:number = 0;

  fileName:string = 'SaleSheets.xlsx';
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

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}`);
  }

  exportPDF(){
    let pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.save(`${Date.now()}-ລາຍງານຂໍ້ມູນການຂາຍ.pdf`)
      }
    })
  }

  showAllReport(){
    this.slDetailService.SaleDetailReport().subscribe((res) => {
      this.saleDetailReportList = res;
      this.grandTotal = this.saleDetailReportList.reduce(function(acc:any, val:any){
        return acc +=val.price*val.qty;
      },0)
    });
  }

  onQueryReport(saledate:any){
    this.slDetailService.SaleDetailReportByQueryString(saledate).subscribe(res => {
      this.saleDetailReportList = res;
      for(let i=0; i<this.saleDetailReportList.length; i++){
        this.grandTotal = this.saleDetailReportList.reduce(function(acc:any, val:any){
          return acc +=val.price*val.qty;
        },0)
      }
    });
  }

  calGrandTotal(){
    
  }

}
