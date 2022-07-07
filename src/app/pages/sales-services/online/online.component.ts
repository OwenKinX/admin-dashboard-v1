import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { SaleDetailService } from '../saleDetail.service';
import { CustomersService } from '../../managements/customers/customers.service';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  receiptno_temp:any;           //store inv_no in array, because inv_no are in many object
  receiptno:any;

  grandTotal:number = 0;
  grandQty:number = 0;

  dateTime:Date;
  
  saleOnlineList:any = [];
  dtOptions:DataTables.Settings = {};

  listReceipt:any = [];

  employee_temp:any;
  customer_temp:any;
  employee:string;
  customer:number;

  constructor(
    private saleService:SalesService,
    private saleDetail:SaleDetailService,
    private user:CustomersService
  ) { }

  ngOnInit(): void {
    this.saleService.getOnlineSales().subscribe(data => {
      this.saleOnlineList = data
    });

    timer(0,1000).subscribe(() => {
      this.dateTime = new Date();
    });

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  getReceipt(invno:string){
    this.saleDetail.getBillReceipt(invno).subscribe( receipt => {
      this.listReceipt = receipt;

      // store inv_no, cus_id and emp_id in each temp[]
      this.receiptno_temp = this.listReceipt.map((bill:any) => bill.inv_no);
      this.customer_temp = this.listReceipt.map((bill:any) => bill.customer);
      this.employee_temp = this.listReceipt.map((bill:any) => bill.employee);

      // get only index or any index
      this.receiptno = this.receiptno_temp[0];
      this.customer = this.customer_temp[0];
      this.employee = this.employee_temp[0];

      this.grandTotal = this.listReceipt.reduce(function(acc:any, val:any){
        return acc += (val.price*val.qty);
      },0);

      this.grandQty = this.listReceipt.reduce(function(acc:any, val:any){
        return acc += val.qty;
      },0);
    });
  }

  userData:any = [];
  getUserData(cus_id:any){
    this.user.getUserProfile(cus_id).subscribe( data => {
      this.userData = [data];
    })
  }

  onDelete( id:any, i:any ){
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
      if(result.isConfirmed){
        this.saleService.deleteSale(id).subscribe(()=>{
          this.saleOnlineList.splice(i,1);
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
