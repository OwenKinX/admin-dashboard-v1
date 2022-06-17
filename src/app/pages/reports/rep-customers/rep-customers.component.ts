import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomersService } from '../../managements/customers/customers.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';

@Component({
  selector: 'app-rep-customers',
  templateUrl: './rep-customers.component.html',
  styleUrls: ['./rep-customers.component.css']
})
export class RepCustomersComponent implements OnInit {

  @ViewChild('userTable',{static:false}) el!: ElementRef;

  userList:any = [];
  fileName:string = 'CustomerSheets.xlsx';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນລູກຄ້າ';
  today:any;
  time:any;
  dateTime:Date;

  constructor(
    private userService:CustomersService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res;
    })

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  exportExcel():void{
    /* pass here the table id */
    let element = document.getElementById('user-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}`);
  }

  exportPDF() {
    let pdf = new jsPDF();
    pdf.html(this.el.nativeElement, {
      callback:(pdf) => {
        pdf.save(`${Date.now()}-ລາຍງານຂໍ້ມູນລູກຄ້າ.pdf`);
      }
    })
  }

}
