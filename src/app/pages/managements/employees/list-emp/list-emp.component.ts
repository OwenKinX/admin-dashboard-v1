import { Component, OnInit } from '@angular/core';
import { EmpService } from '../employees.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-emp',
  templateUrl: './list-emp.component.html',
  styleUrls: ['./list-emp.component.css']
})
export class ListEmpComponent implements OnInit {

  Employees:any = [];
  dtOptions:DataTables.Settings = {};

  constructor(
    private empService:EmpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.empService.getEmps().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.Employees = res;
      },500);
    })

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onDelete(id:string,i:any){
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
        this.empService.deleteEmp(id).subscribe((res) => {
          this.Employees.splice(i,1);
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
