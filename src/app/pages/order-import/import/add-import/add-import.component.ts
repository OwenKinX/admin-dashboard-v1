import { Component, OnInit, NgZone } from '@angular/core';
import { ImportsService } from '../../imports.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/pages/managements/products/products.service';
import { EmpService } from 'src/app/pages/managements/employees/employees.service';
import { OrdersService } from '../../orders.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-import',
  templateUrl: './add-import.component.html',
  styleUrls: ['./add-import.component.css']
})
export class AddImportComponent implements OnInit {

  constructor(
    private router:Router,
    private ngZone:NgZone,
    private importService:ImportsService,
    private productService:ProductsService,
    private empService:EmpService,
    private orderService:OrdersService
  ) { }

  importForm:FormGroup;
  productList:any = [];
  employees:any = [];
  orders:any = [];

  genImpId:any = `IMP-${Date.now()}`;

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

    this.importForm = new FormGroup({
      imp_no:new FormControl(this.genImpId, {validators: [Validators.required]}),
      c_price:new FormControl(null, {validators: [Validators.required]}),
      imp_qty:new FormControl(null, {validators: [Validators.required]}),
      date:new FormControl(null, {validators: [Validators.required]}),
      bill_no:new FormControl(null, {validators: [Validators.required]}),
      product:new FormControl(null, {validators: [Validators.required]}),
      order:new FormControl(null, {validators: [Validators.required]}),
      employee:new FormControl(null, {validators: [Validators.required]})
    })
  }

  onSubmit():any{
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.importService.AddImports(this.importForm.value).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: true
          });
          this.importForm.reset();
          this.ngZone.run(() => this.router.navigate(['/import']))
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err,
        showConfirmButton: true
      });
    })
  }

}
