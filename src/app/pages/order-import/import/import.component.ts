import { Component, OnInit } from '@angular/core';
import { ImportsService } from '../imports.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  imports:any = [];

  constructor(
    private importService:ImportsService,
    public pipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.importService.getAllImports().subscribe((res) => {
      this.imports = res;
    })
  }
  onDelete( id:any, i:any){
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
      if(result.isConfirmed) {
        this.importService.deleteImports(id).subscribe((res) => {
          this.imports.splice(i,1);
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
