import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmpService } from '../../managements/employees/employees.service';
import { PositionService } from '../../managements/positions/emp-position.service';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-rep-emps',
  templateUrl: './rep-emps.component.html',
  styleUrls: ['./rep-emps.component.css']
})
export class RepEmpsComponent implements OnInit {

  @ViewChild('empTable') empTable!:ElementRef;

  empReportList:any = [];
  positions:any=[];

  fileName:string = 'EmployeesSheets';
  fileNameLao:string = 'ລາຍງານຂໍ້ມູນພະນັກງານ';
  dateTime:Date;

  constructor(
    public empService:EmpService,
    private epService:PositionService
  ) { }

  ngOnInit(): void {
    this.epService.getPositions().subscribe(res => {
      this.positions = res;
    });

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })
  }

  exportExcel(){
    let element = document.getElementById('emp-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, `${Date.now()}-${this.fileNameLao}-${this.fileName}.xlsx`);
  }

  exportPDF(){
    let DATA = document.getElementById('empTable');
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

  displayEmpReport(){
    this.empService.getEmployeeReport().subscribe(res => {
      this.empReportList = res;
    });
  }

  reportByPosition(position:string){
    this.empService.getEmployeeReportByPosition(position).subscribe(res => {
      this.empReportList = res;
    });
  }
}
