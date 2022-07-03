import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rep-income-expanse',
  templateUrl: './rep-income-expanse.component.html',
  styleUrls: ['./rep-income-expanse.component.css']
})
export class RepIncomeExpanseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById("defaultOpen").click();
  }

  openCity(tabName:any,elmnt:any, color:any) {
    var i:number, tabcontent:any, tablinks:any;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    } 
    document.getElementById(tabName).style.display = "block";
  }
}
