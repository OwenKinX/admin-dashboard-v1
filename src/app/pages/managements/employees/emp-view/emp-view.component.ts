import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpService } from '../employees.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-emp-view',
  templateUrl: './emp-view.component.html',
  styleUrls: ['./emp-view.component.css']
})
export class EmpViewComponent implements OnInit {

  Employees:any = [];
  getId:any = [];

  date:Date =  new Date();
  pipe =  new DatePipe('en-US');
  dateWithPipe = null;

  constructor(
    private empService:EmpService,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.empService.getEmp(this.getId).subscribe((res) => {
      this.Employees = [res];
      this.dateWithPipe = this.pipe.transform( res.dob, 'dd/MM/yyyy');
    })
  }

}
