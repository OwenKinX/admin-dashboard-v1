import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../managements/supplier/supplier.service';
import { EmpService } from '../../managements/employees/employees.service';
import { OrdersService } from '../orders.service';
import { OrderDetailService } from '../orderDetail.service';

import { NgForm } from '@angular/forms';
import { timer } from 'rxjs';

import Swal from 'sweetalert2';
import { Orders } from '../orders.model';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css'],
  providers: [OrdersService]
})
export class OrderManageComponent implements OnInit {

  isSwap:boolean = false;

  purchase_temp:any;
  purchase:any;

  dateTime:Date;

  empList:any = [];
  supplierList:any = [];

  employee_temp:any;
  supplier_temp:any;
  employee:string;
  supplier:string;

  grandTotal:number = 0;
  grandQty:number = 0;

  listPurchase:any = [];
  
  dtOptions:DataTables.Settings = {};

  constructor(
    public orderService:OrdersService,
    private orderdetail:OrderDetailService,
    private supService:SupplierService,
    private empService:EmpService
  ) { }

  onSwap() { this.isSwap = true; }
  onCancel() { this.isSwap = false; }

  resetForm(form?:NgForm){
    if(form){
      form.reset()
    }
    this.orderService.selectedOrder = {
      _id:"",
      order_no:"",
      status:"",
      date:"",
      supplier:"",
      employee:""
    }
    this.refreshOrderList();
  }

  refreshOrderList(){
    this.orderService.GetAllOrder().subscribe((res) => {
      this.orderService.orders = res as Orders[];
    })
    this.onCancel()
  }

  onEdit( orders:Orders ){
    this.orderService.selectedOrder = orders;
    this.onSwap();
  }

  ngOnInit(): void {
    this.resetForm();
    // get emp
    this.empService.getEmps().subscribe((res) => {
      this.empList = res;
    })
    // get sup
    this.supService.getSuppliers().subscribe((res) => {
      this.supplierList = res;
    })

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    })

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  getPurchase(order_no:string){
    this.orderdetail.getPurchase(order_no).subscribe(purchase => {
      this.listPurchase = purchase;

      this.purchase_temp = this.listPurchase.map((bill:any) => bill.order_no);
      this.supplier_temp = this.listPurchase.map((bill:any) => bill.supplier);
      this.employee_temp = this.listPurchase.map((bill:any) => bill.employee);

      this.purchase = this.purchase_temp[0];
      this.supplier = this.supplier_temp[0];
      this.employee = this.employee_temp[0];

      this.grandTotal = this.listPurchase.reduce(function(acc:any, val:any){
        return acc += (val.price*val.qty);
      },0);

      this.grandQty = this.listPurchase.reduce(function(acc:any, val:any){
        return acc += val.qty;
      },0)
    })
  }

  onSubmit(form:NgForm){
    if(form.value._id == ""){
      Swal.fire({
        icon: 'question',
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.orderService.AddOrder(form.value).subscribe((res) => {
            this.resetForm();
            this.refreshOrderList();
            Swal.fire({
              icon: 'success',
              title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
              showConfirmButton: true
            })
          })
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
          text: err,
          showConfirmButton: true
        });
      })
    }else{
      this.orderService.UpdateOrder(form.value).subscribe((res) => {
        this.resetForm();
        this.refreshOrderList();
        Swal.fire({
          icon: 'success',
          title: 'ຢືນຢັນສະຖານະ',
          showConfirmButton: true
        })
      })
    }
  }

  onDelete(_id:string, form:NgForm){
    Swal.fire({
      title: 'ຕ້ອງການລຶບຂໍ້ມູນແທ້ບໍ ?',
      text: "ຖ້າລຶບແລ້ວຈະບໍ່ສາມາກູ້ຄືນໄດ້!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລຶບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.DeleteOrder(_id).subscribe((res) => {
          this.resetForm(form);
          this.refreshOrderList();
        })
        Swal.fire(
          'ລຶບຂໍ້ມູນສຳເລັດ!',
          'ຂໍ້ມູນໄດ້ຖືກລຶບອອກຈາກລະບົບແລ້ວ',
          'success'
        )
      }
    })
  }

}
