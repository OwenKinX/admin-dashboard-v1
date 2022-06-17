import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from '../orderDetail.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderDetailService]
})
export class OrderComponent implements OnInit {

  orderDetailList:any = [];
  getOrderNo:any;

  dtOptions:DataTables.Settings = {};

  constructor(
    public detailService:OrderDetailService,
    private activeRoute:ActivatedRoute
  ) { }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  ngOnInit(): void {
    this.getOrderNo = this.activeRoute.snapshot.paramMap.get('order_no');
    this.detailService.GetOrderDetailByOrderNo(this.getOrderNo).subscribe(res => {
      this.orderDetailList = res;
    })
    
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onDelete( order_no:any ){
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
        this.detailService.DeleteOrderDetailByOrderNo(order_no).subscribe((res) => {
          Swal.fire(
            'ລຶບຂໍ້ມູນສຳເລັດ!',
            'ຂໍ້ມູນໄດ້ຖືກລຶບອອກຈາກລະບົບແລ້ວ',
            'success'
          )
        })
      }
    })
  }
}
