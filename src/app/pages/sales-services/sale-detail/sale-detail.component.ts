import { Component, OnInit } from '@angular/core';
import { SaleDetailService } from '../saleDetail.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css'],
  providers: [SaleDetailService]
})
export class SaleDetailComponent implements OnInit {

  saleDetailList:any = [];
  getInvNo:any;
  dtOptions:DataTables.Settings = {}

  constructor(
    public sdetailServ:SaleDetailService,
    private activeRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getInvNo = this.activeRoute.snapshot.paramMap.get('inv_no');
    this.sdetailServ.GetSaleDetailByInvNo(this.getInvNo).subscribe((res) => {
      this.saleDetailList = res;
    })

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onDelete( inv_no:string ){
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
        this.sdetailServ.DeleteByInvNo(inv_no).subscribe((res) => {
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
