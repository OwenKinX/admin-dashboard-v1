import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../customers.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-cus-view',
  templateUrl: './cus-view.component.html',
  styleUrls: ['./cus-view.component.css']
})
export class CusViewComponent implements OnInit {

  Users:any;
  getId:any;

  date:Date =  new Date();
  pipe =  new DatePipe('en-US');
  dateWithPipe = null

  constructor(
    private userService:CustomersService,
    private activeRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.getId).subscribe((res) => {
      this.Users = [res];
      this.dateWithPipe = this.pipe.transform( res.dob, 'dd/MM/yyyy');
    })
  }

}
