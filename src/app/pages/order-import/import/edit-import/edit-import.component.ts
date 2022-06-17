import { Component, OnInit, NgZone } from '@angular/core';
import { ImportsService } from '../../imports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ProductsService } from 'src/app/pages/managements/products/products.service';
import { EmpService } from 'src/app/pages/managements/employees/employees.service';
import { OrdersService } from '../../orders.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-import',
  templateUrl: './edit-import.component.html',
  styleUrls: ['./edit-import.component.css']
})
export class EditImportComponent implements OnInit {

  updateImportForm:FormGroup;
  productList:any = [];
  employees:any = [];
  orders:any = [];

  getId:any;

  constructor(
    private router: Router,
    private activeRoute:ActivatedRoute,
    private ngZone: NgZone,
    private importService: ImportsService,
    private productService: ProductsService,
    private empService: EmpService,
    private orderService: OrdersService,
  ) {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.importService.getImports(this.getId).subscribe((res) => {
      let date = new Date(res.date);
      const format = 'yyyy-MM-dd';
      const locale = 'en_US';
      const formattedDate = formatDate(date,format,locale);
      
      this.updateImportForm.setValue({
          imp_no:res['imp_no'],
          c_price:res['c_price'],
          imp_qty:res['imp_qty'],
          date:formattedDate,
          bill_no:res['bill_no'],
          product:res['product'],
          order:res['order'],
          employee:res['employee']
      })
    })
    this.updateImportForm = new FormGroup({
      imp_no:new FormControl(null, {validators: [Validators.required]}),
      c_price:new FormControl(null, {validators: [Validators.required]}),
      imp_qty:new FormControl(null, {validators: [Validators.required]}),
      date:new FormControl(null, {validators: [Validators.required]}),
      bill_no:new FormControl(null, {validators: [Validators.required]}),
      product:new FormControl(null, {validators: [Validators.required]}),
      order:new FormControl(null, {validators: [Validators.required]}),
      employee:new FormControl(null, {validators: [Validators.required]})
    })
  }

  ngOnInit(): void {
    // get product
    this.productService.getAllProduct().subscribe((res) => {
      this.productList = res;
    })
    // get employee
    this.empService.getEmps().subscribe((res) => {
      this.employees = res;
    })
    // get order no
    this.orderService.GetAllOrder().subscribe((res) => {
      this.orders = res;
    })
  }

  onUpdate(){
    this.importService.updateImports(
      this.getId, 
      this.updateImportForm.value
    ).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
        showConfirmButton: true,
      });
      this.updateImportForm.reset();
      this.ngZone.run(() => this.router.navigate(['/import']));
    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ',
        showConfirmButton: true,
      });
    })
  }
}
