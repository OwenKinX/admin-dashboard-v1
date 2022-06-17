import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-cus',
  templateUrl: './list-cus.component.html',
  styleUrls: ['./list-cus.component.css']
})
export class ListCusComponent implements OnInit {

  Users:any = [];
  dtOptions:DataTables.Settings = {};

  constructor(
    private service:CustomersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.Users = res;
      },500);
    })
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onDelete(id:any,i:any){
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
        this.service.deleteUser(id).subscribe((res) => {
          this.Users.splice(i, 1);
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
