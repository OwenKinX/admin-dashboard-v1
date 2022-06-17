import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-manage',
  templateUrl: './sale-manage.component.html',
  styleUrls: ['./sale-manage.component.css']
})
export class SaleManageComponent implements OnInit {

  constructor(
    private saleService:SalesService,
    public pipe:DatePipe
  ) { }

  saleList:any = [];
  dtOptions:DataTables.Settings = {};

  ngOnInit(): void {
    this.saleService.getAllSales().subscribe((res: {date:string}) => {
      this.saleList = res;
    });

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
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
