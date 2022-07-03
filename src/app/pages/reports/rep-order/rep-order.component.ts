import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { OrderDetailService } from '../../order-import/orderDetail.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-rep-order',
  templateUrl: './rep-order.component.html',
  styleUrls: ['./rep-order.component.css']
})
export class RepOrderComponent implements OnInit {
  @ViewChild('orderTable') orderTable!:ElementRef

  orderReportList:any = [];
  grandTotal:number = 0;

  fileName:string = 'OrderSheets';
  fileNameLao:string = 'ລາຍງານການສັ່ງຊື້';
  dateTime:Date;

  constructor(
    private order:OrderDetailService
  ) { }

  ngOnInit(): void {
    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });
  }

  exportPDF(){
    let DATA = document.getElementById('orderTable');
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

  exportExcel(){
    let element = document.getElementById('order-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  onQueryReport(startdate:any, lastdate:any){
    this.order.getReportByDate(startdate,lastdate).subscribe( report => {
      this.orderReportList = report;
      this.grandTotal = this.orderReportList.reduce( function(acc:any, val:any) {
        return acc += val.price*val.qty;
      },0);
    })
  }

  showAllReport(){
    this.order.getOrderReportList().subscribe(report => {
      this.orderReportList = report;
      this.grandTotal = this.orderReportList.reduce( function(acc:any, val:any) {
        return acc += val.price*val.qty;
      },0);
    });
  }

  onCancel(){
    this.orderReportList = [];
    this.grandTotal = 0;
  }

}
