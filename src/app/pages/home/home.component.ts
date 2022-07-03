import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProductsService } from '../managements/products/products.service';
import { CustomersService } from '../managements/customers/customers.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleDetailService } from '../sales-services/saleDetail.service';
import { timer } from 'rxjs';
import { ImportsService } from '../order-import/imports.service';

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
    private importService:ImportsService,
    private spinner: NgxSpinnerService
  ){}

  // store stock
  inStock:any = [];
  userList:any = [];
  incomeResult:any = [];
  expanseResult:any = [];

  monthIncome:number = 0;
  monthExpanse:number = 0;

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
        this.incomeResult = res;
        this.monthIncome = this.incomeResult.map((incomes:any) => incomes.incTotal);
      },500);
    })

    // get month expanse
    this.importService.monthExpanseReport().subscribe(res => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.expanseResult = res;
        this.monthExpanse = this.expanseResult.map((expanes:any) => expanes.expTotal)
      },500);
    })

  }

}
