import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImportsService } from '../../order-import/imports.service';
import { DatePipe } from '@angular/common';
import { Imports } from '../../order-import/imports.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rep-imp',
  templateUrl: './rep-imp.component.html',
  styleUrls: ['./rep-imp.component.css']
})
export class RepImpComponent implements OnInit {

  @ViewChild('importTable', {static:false}) el!:ElementRef;

  importList:any = [];
  importGrandTotal:any;

  fileName:string = 'ProductSheets.xlsx';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນສິນຄ້າ';
  today:string;

  constructor(
    private service:ImportsService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.service.getImpReport().subscribe((res) => {
      this.importList = res;
    });

    this.service.getTotalAmount().subscribe((res) => {
      this.importGrandTotal = res;
    })

    const date = new Date();
    this.today = this.datePipe.transform(date, "dd/MM/yyyy");
  }

  exportExcel(){
    let element = document.getElementById('import-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}`);
  }

  exportPDF(){
    let pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.save(`${Date.now()}-ລາຍງານຂໍ້ມູນສິນຄ້າ.pdf`)
      }
    })
  }

}
