import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpService } from '../../managements/employees/employees.service';
import { CustomersService } from '../../managements/customers/customers.service';
import { SalesService } from '../sales.service';
import { SaleDetailService } from '../saleDetail.service';
import { ProductsService } from '../../managements/products/products.service';
import { timer } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  saleForm:FormGroup;

  // store data from product service
  productList:any = [];

  // store data from employee service
  empList:any = [];

  // store data from customer service
  userList:any = [];

  // ເລກບິນການຂາຍ
  saleId:string = `INV-40`;

  // ລາຍການສິນຄ້າທີ່ຈະຂາຍ
  grandTotal:number = 0;

  // ດິງວັນທີ ປັດຈຸບັນ
  dateTime:Date;

  constructor(
    private empService:EmpService,
    private userService:CustomersService,
    private saleService:SalesService,
    private productService:ProductsService,
    private saleDtlService:SaleDetailService,
  ) { }

  ngOnInit(): void {

    // generate id
    this.generateId();

    // sale data form
    this.saleForm = new FormGroup({
      invoice_no:new FormControl(this.saleId,{validators:[Validators.required]}),
      sale_type:new FormControl("POS",{validators:[Validators.required]}),
      cash:new FormControl(null,{validators:[Validators.required]}),
      date:new FormControl("",{validators:[Validators.required]}),
      delivery:new FormControl(""),
      customer:new FormControl(null),
      employee:new FormControl(null)
    });

    // get all product
    this.productService.getProductToSale().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {inv_no:this.saleId, qty:1, price:a.price*1.05});
      });
    });

    // get all emp
    this.empService.getEmps().subscribe((res) => {
      this.empList = res;
    });

    // get all user
    this.userService.getUsers().subscribe((res) => {
      this.userList = res;
    });

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });

    // get calculate grand total
    this.calculateGrandtotal();
  }

  generateId(){
    const possible = "0123456789";
    for(let i = 0; i < 9; i++)  {
      this.saleId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  // decrease product quantity
  decrease(pro_id:any, qty:any){
    for(let i=0; i<this.saleItems.length; i++){
      if(this.saleItems[i].pro_id === pro_id){
        if(qty != 1){
          this.saleItems[i].qty = parseInt(qty)-1;
        }
      }
    }
    localStorage.setItem('saleList', JSON.stringify(this.saleItems));
    this.calculateGrandtotal();
  }

  // increase product quantity
  increase(pro_id:any, qty:any){
    for(let i=0; i<this.saleItems.length; i++){
      if(this.saleItems[i].pro_id === pro_id){
        if(qty != this.saleItems[i].stock_qty){
          this.saleItems[i].qty = parseInt(qty)+1;
        }
      }
    }
    localStorage.setItem('saleList', JSON.stringify(this.saleItems));
    this.calculateGrandtotal();
  }

  // Save sale list to localstorage and show items list to table but when refresh all items will still 
  saleItems:any = [];
  chooseItem(productlist:any){
    let cartSaleNull = localStorage.getItem('saleList');

    if(cartSaleNull == null){
      let storeDataGet:any = [];
      storeDataGet.push(productlist);
      localStorage.setItem('saleList', JSON.stringify(storeDataGet));
    }else{
      var id = productlist.pro_id;
      let index:number = -1;
      this.saleItems = JSON.parse(localStorage.getItem('saleList'));
      for(let i=0; i<this.saleItems.length; i++){
        if(parseInt(id) === parseInt(this.saleItems[i].pro_id)){
          this.saleItems[i].qty = productlist.qty;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.saleItems.push(productlist);
        localStorage.setItem('saleList', JSON.stringify(this.saleItems));
      }else{
        localStorage.setItem('saleList', JSON.stringify(this.saleItems))
      }
    }
    this.calculateGrandtotal();
  }

  calculateGrandtotal(){
    if(localStorage.getItem('saleList')){
      this.saleItems = JSON.parse(localStorage.getItem('saleList'));
      this.grandTotal = this.saleItems.reduce(function(acc:any, val:any){
        return acc + (val.price*val.qty);
      },0);
    }
  }

  // remove single item
  removeItem(item:any){
    if(localStorage.getItem('saleList')){
      this.saleItems = JSON.parse(localStorage.getItem('saleList'));
      for(let i=0; i<this.saleItems.length; i++){
        if(this.saleItems[i].pro_id === item){
          this.saleItems.splice(i, 1);
          localStorage.setItem('saleList', JSON.stringify(this.saleItems));
          this.calculateGrandtotal();
        }
      }
    }
  }

  // clear all items
  emptyItems(){
    localStorage.removeItem('saleList');
    this.saleItems = [];
    this.grandTotal = 0;
  }

  onSaveSaleData():any{
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.saleService.AddSale(this.saleForm.value).subscribe((res) => {
          Swal.fire({
            icon:'success',
            title:'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: true
          })
          this.saleForm.reset();
          // this.ngZone.run(() => this.router.navigate(['/sale-manage']));
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

  onSaveSaleDetail(saleDetail:any){
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.saleDtlService.AddSaleDetail(saleDetail).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'ບັນທຶກຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          })
          this.emptyItems();
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err.message,
        showConfirmButton: true
      });
    })
  }
}