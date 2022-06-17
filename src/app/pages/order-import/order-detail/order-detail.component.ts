import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../managements/products/products.service';
import { SupplierService } from '../../managements/supplier/supplier.service';
import { EmpService } from '../../managements/employees/employees.service';
import { OrderDetailService } from '../orderDetail.service';
import { OrdersService } from '../orders.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderDataForm:FormGroup;

  // ເລກບິນການສັ່ງຊື້
  order_no:string = `OD-30`;

  // store data from product service
  productList:any = [];

  // store data from supplier service
  supplierList:any = [];

  // store data from employee service
  empList:any = [];

  // ລາຍການສິນຄ້າທີ່ຈະສັ່ງຊື້
  grandTotal:number = 0;

  constructor(
    private pService:ProductsService,
    private orderDtlService:OrderDetailService,
    private supService:SupplierService,
    private empService:EmpService,
    private orderService:OrdersService
  ) { }

  ngOnInit(): void {
    // generate id
    const possible = "0123456789";
    for(let i = 0; i < 9; i++)  {
      this.order_no += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    // order data form
    this.orderDataForm = new FormGroup({
      order_no: new FormControl(this.order_no, {validators:[Validators.required]}),
      status: new FormControl(null, {validators:[Validators.required]}),
      date: new FormControl(null, {validators:[Validators.required]}),
      supplier: new FormControl(null, {validators:[Validators.required]}),
      employee: new FormControl(null, {validators:[Validators.required]})
    });

    // get all product to modal
    this.pService.getProductToOrder().subscribe(res => {
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {order_no:this.order_no, qty:1});
      });
    });

    // get supplier
    this.supService.getSuppliers().subscribe(res => {
      this.supplierList = res;
    })

    // get supplier
    this.empService.getEmps().subscribe(res => {
      this.empList = res;
    })

    // get calculate grand total
    this.calculateGrandtotal();
  }

  decrease(pro_id:any,qty:any){
    for(let i=0; i<this.orderItems.length; i++){
      if(this.orderItems[i].pro_id === pro_id){
        if(qty != 1){
          this.orderItems[i].qty = parseInt(qty)-1;
        }
      }
    }
    localStorage.setItem('orderList',JSON.stringify(this.orderItems));
    this.calculateGrandtotal();
  }

  increase(pro_id:any,qty:any){
    for(let i=0; i<this.orderItems.length; i++){
      if(this.orderItems[i].pro_id === pro_id){
        this.orderItems[i].qty = parseInt(qty)+1;
      }
    }
    localStorage.setItem('orderList',JSON.stringify(this.orderItems));
    this.calculateGrandtotal();
  }

  // Save order list to localstorage and show items list to table but when refresh all items will disappear 
  orderItems:any = [];
  chooseItem(productlist:any){
    let cartOrderNull = localStorage.getItem('orderList');

    if(cartOrderNull == null){
      let storeDataGet:any = [];
      storeDataGet.push(productlist);
      localStorage.setItem('orderList', JSON.stringify(storeDataGet));
    }else{
      var id = productlist.pro_id;
      let index:number = -1;
      this.orderItems = JSON.parse(localStorage.getItem('orderList'));
      for (let i=0; i<this.orderItems.length; i++){
        if(parseInt(id) === parseInt(this.orderItems[i].pro_id)){
          this.orderItems[i].qty = productlist.qty;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.orderItems.push(productlist);
        localStorage.setItem('orderList', JSON.stringify(this.orderItems));
      }
      else{
        localStorage.setItem('orderList', JSON.stringify(this.orderItems));
      }
    }
    this.calculateGrandtotal();
  }
  // 

  calculateGrandtotal(){
    if(localStorage.getItem('orderList')){
      this.orderItems = JSON.parse(localStorage.getItem('orderList'));
      this.grandTotal = this.orderItems.reduce(function(acc:any, val:any){
        return acc + (val.price*val.qty);
      },0);
    }
  }

  // remove single item
  removeItem(item:any){
    if(localStorage.getItem('orderList')){
      this.orderItems = JSON.parse(localStorage.getItem('orderList'));
      for(let i=0; i<this.orderItems.length; i++){
        if(this.orderItems[i].pro_id === item){
          this.orderItems.splice(i, 1);
          localStorage.setItem('orderList', JSON.stringify(this.orderItems));
          this.calculateGrandtotal();
        }
      }
    }
  }

  // clear all items
  emptyItems(){
    localStorage.removeItem('orderList');
    this.orderItems = [];
    this.grandTotal = 0;
  }

  // Append order data to order service
  onSaveOrderData(){
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.orderService.AddOrder(this.orderDataForm.value).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          });
          this.orderDataForm.reset();
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err.message,
        showConfirmButton: true
      });
    });
  }

  // Append order detail data to order service
  onSaveOrderDetail(orderDetail:any){
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.orderDtlService.AddOrderDetail(orderDetail).subscribe(res => {
          Swal.fire({
            icon: 'success',
            title: 'ບັນທຶກຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          });
          this.emptyItems();
        })
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err.message,
        showConfirmButton: true
      });
    });
  }
}
