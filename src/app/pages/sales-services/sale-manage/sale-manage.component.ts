import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { SaleDetailService } from '../saleDetail.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-sale-manage',
  templateUrl: './sale-manage.component.html',
  styleUrls: ['./sale-manage.component.css']
})
export class SaleManageComponent implements OnInit {

  receiptno_temp:any;           //store inv_no in array, because inv_no are in many object
  receiptno:any;

  grandTotal:number = 0;
  grandQty:number = 0;

  dateTime:Date;

  saleList:any = [];
  dtOptions:DataTables.Settings = {};

  listReceipt:any = [];

  employee_temp:any;
  customer_temp:any;
  employee:string;
  customer:number;

  constructor(
    private saleService:SalesService,
    private saleDetail:SaleDetailService
  ) { }

  ngOnInit(): void {
    this.saleService.getAllSales().subscribe((res: {date:string}) => {
      this.saleList = res;
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
          this.saleList.splice(i,1);
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
