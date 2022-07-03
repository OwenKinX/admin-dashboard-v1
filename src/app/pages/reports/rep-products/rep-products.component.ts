import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../../managements/products/products.service';
import { ProdTypeService } from '../../managements/prodtype/prodtype.service';
import { CategoryService } from '../../managements/categories/category.service';

import { timer } from 'rxjs';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rep-products',
  templateUrl: './rep-products.component.html',
  styleUrls: ['./rep-products.component.css']
})
export class RepProductsComponent implements OnInit {

  @ViewChild('productTable') productTable!:ElementRef;

  productReportList:any = [];
  grandTotal:number = 0;
  grandQty:number = 0;

  procategory:any = [];
  producttypes:any = [];

  // store filter by category
  type_data:any = [];

  fileName:string = 'ProductSheets';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນສິນຄ້າ';
  dateTime:Date;

  constructor(
    private productService:ProductsService,
    private catService:CategoryService,
    private typeService:ProdTypeService
  ) { }

  ngOnInit(): void {

    this.catService.getCategories().subscribe( res => {
      this.procategory = res;
    })

    this.typeService.getAllProdTypes().subscribe(res => {
      this.producttypes = res;
    });

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })
  }

  onSelectCat(pc_id:any){
    let data = this.producttypes.filter((res: {category:string}) => {
      return res.category.match(pc_id.target.value)
    });
    this.type_data = data;
  }

  exportExcel(){
    let element = document.getElementById('product-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('productTable');
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

  displayReports(){
    this.productService.productReport().subscribe((res) => {
      this.productReportList = res;
      this.grandTotal = this.productReportList.reduce( function(acc:any, val:any){
        return acc += val.total;
      },0);

      this.grandQty = this.productReportList.reduce( function(acc:any, val:any){
        return acc += val.stock_qty
      },0);
    });
  }

  reportByType(type:string){
    this.productService.getProductByType(type).subscribe( res=> {
      this.productReportList = res;
      this.grandTotal = this.productReportList.reduce( function(acc:any, val:any){
        return acc += val.total;
      },0);

      this.grandQty = this.productReportList.reduce( function(acc:any, val:any){
        return acc += val.stock_qty
      },0);
    });
  }

  onCancel(){
    this.productReportList = [];
    this.grandTotal = 0;
    this.grandQty = 0;
  }

}
