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

  importList:any = [];
  grandTotal:number = 0;

  genImpId:string = `IMP-600`;

  ngOnInit(): void {
    // generate id
    this.generateId();

    // get product
    this.productService.getProductToOrder().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {imp_no: this.genImpId,qty:1});
      });
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
      imp_no:new FormControl(this.genImpId),
      date: new FormControl("",{validators: [Validators.required]}),
      bill_no:new FormControl(null),
      order_no:new FormControl(null, {validators: [Validators.required]}),
      employee:new FormControl(null, {validators: [Validators.required]})
    })

    this.calculateGrandtotal();
  }

  generateId(){
    const possible = "0123456789";
    for(let i = 0; i < 9; i++)  {
      this.genImpId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  decrease(pro_id:any, qty:any){
    for(let i=0; i<this.importList.length; i++){
      if(this.importList[i].pro_id === pro_id){
        if( qty !=1 ){
          this.importList[i].qty = parseInt(qty)-1;
        }
      }
    }
    localStorage.setItem('importList', JSON.stringify(this.importList));
    this.calculateGrandtotal();
  }

  increase(pro_id:any,qty:any){
    for(let i=0; i<this.importList.length; i++){
      if(this.importList[i].pro_id === pro_id){
        this.importList[i].qty = parseInt(qty)+1;
      }
    }
    localStorage.setItem('importList',JSON.stringify(this.importList));
    this.calculateGrandtotal();
  }

  chooseItem(importlist:any){
    let tempNull = localStorage.getItem('importList');

    if(tempNull == null){
      let storeTemp:any = [];
      storeTemp.push(importlist);
      localStorage.setItem('importList', JSON.stringify(storeTemp));
    }else{
      var id = importlist.pro_id;
      let index:number = -1;
      this.importList = JSON.parse(localStorage.getItem('importList'));
      for(let i=0; i<this.importList.length; i++){
        if(parseInt(id) === parseInt(this.importList[i].pro_id)){
          this.importList[i].qty = importlist.qty;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.importList.push(importlist);
        localStorage.setItem('importList', JSON.stringify(this.importList));
      }else{
        localStorage.setItem('importList', JSON.stringify(this.importList));
      }
    }
    this.calculateGrandtotal();
  }

  calculateGrandtotal(){
    if(localStorage.getItem('importList')){
      this.importList = JSON.parse(localStorage.getItem('importList'));
      this.grandTotal = this.importList.reduce(function(acc:any, val:any){
        return acc + (val.price*val.qty);
      },0);
    }
  }

  removeItem(item:any){
    if(localStorage.getItem('importList')){
      this.importList = JSON.parse(localStorage.getItem('importList'));
      for(let i=0; i<this.importList.length; i++){
        if(this.importList[i].pro_id === item){
          this.importList.splice(i, 1);
          localStorage.setItem('importList',JSON.stringify(this.importList));
          this.calculateGrandtotal();
        }
      }
    }
  }

  emptyList(){
    localStorage.removeItem('importList');
    this.importList = [];
    this.grandTotal = 0;
  }

  onSaveImportList(importList:any){
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        // change save to import detail
        this.importService.AddImportDetail(importList).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: true
          });
          this.emptyList();
          this.ngZone.run(() => this.router.navigate(['/import']));
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

  onSubmit():any{
    this.importService.AddImports(this.importForm.value).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
        showConfirmButton: false,
        timer: 500
      });
      this.importForm.reset();
    });
  }

}
