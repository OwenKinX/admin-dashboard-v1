import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-income-expanse',
  templateUrl: './income-expanse.component.html',
  styleUrls: ['./income-expanse.component.css']
})
export class IncomeExpanseComponent implements OnInit {

  @ViewChild('incomeChart') incomeChart!:ElementRef;
  @ViewChild('expanseChart') expanseChart!:ElementRef;

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;


  fileNameLao:string = 'ລາຍງານລາຍຮັບຕັ້ງແຕ່ເດືອນ_ມັງກອນ_ຫາ_ມິຖຸນາ';
  efileNameLao:string = 'ລາຍງານລາຍຈ່າຍຕັ້ງແຕ່ເດືອນ_ມັງກອນ_ຫາ_ມິຖຸນາ';
  dateTime:Date;

  constructor() { }

  ngOnInit(): void {

  }

  exportIncPDF(){
    let DATA = document.getElementById('incomeChart');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 300;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 0, position, fileWidth, fileHeight);
      PDF.save(`${Date.now()}-${this.fileNameLao}.pdf`);
    })
  }

  exportExpPDF(){
    let DATA = document.getElementById('expanseChart');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 300;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 0, position, fileWidth, fileHeight);
      PDF.save(`${Date.now()}-${this.efileNameLao}.pdf`);
    })
  }

  downloadImage(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'income-expanse-year.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
