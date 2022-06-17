import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProductsService } from '../managements/products/products.service';
import { CustomersService } from '../managements/customers/customers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleDetailService } from '../sales-services/saleDetail.service';
import { timer } from 'rxjs';
import { OrderDetailService } from '../order-import/orderDetail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private prodService:ProductsService,
    private userService:CustomersService,
    private sDetailService:SaleDetailService,
    private oderDetailService:OrderDetailService,
    private spinner: NgxSpinnerService
  ){}

  // store stock
  inStock:any = [];
  userList:any = [];
  incomeTotal:any = [];
  expanseTotal:any = [];

  dateTime:Date;

  ngOnInit(): void {

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })

    // get product
    this.prodService.getAllProduct().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.inStock = res;
      },500);
    })

    this.userService.getUsers().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.userList = res;
      },500);
    })

    // get month income
    this.sDetailService.monthIncomeReport().subscribe(res => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.incomeTotal = res;
      },500);
    })

    // get month expanse
    this.oderDetailService.monthExpanseReport().subscribe(res => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.expanseTotal = res;
      },500);
    })

  }

}
