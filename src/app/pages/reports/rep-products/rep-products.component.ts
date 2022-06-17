import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../../managements/products/products.service';
import { ProdTypeService } from '../../managements/prodtype/prodtype.service';
import { timer } from 'rxjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rep-products',
  templateUrl: './rep-products.component.html',
  styleUrls: ['./rep-products.component.css']
})
export class RepProductsComponent implements OnInit {

  @ViewChild('productTable', {static:false}) el!:ElementRef;

  productReportList:any = [];
  productGrandTotal:any = [];

  producttypes:any = [];

  fileName:string = 'ProductSheets.xlsx';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນສິນຄ້າ';
  dateTime:Date;

  constructor(
    private productService:ProductsService,
    private typeService:ProdTypeService
  ) { }

  ngOnInit(): void {

    this.typeService.getAllProdTypes().subscribe(res => {
      this.producttypes = res;
    });

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })
  }

  exportExcel(){
    let element = document.getElementById('product-table');
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

  displayReports(){
    this.productService.productReport().subscribe((res) => {
      this.productReportList = res;
    });

    this.productService.productAmount().subscribe((res) => {
      this.productGrandTotal = res;
    });
  }

  reportByType(type:string){
    this.productService.getProductByType(type).subscribe( res=> {
      this.productReportList = res;
    });
  }

}
