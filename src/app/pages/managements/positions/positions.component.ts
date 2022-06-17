import { Component, OnInit } from '@angular/core';
import { PositionService } from './emp-position.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { Position } from './position.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
  providers: [PositionService]
})

export class PositionsComponent implements OnInit {

  isSwap:boolean = false;
  dtOptions:DataTables.Settings = {}

  onSwap() { this.isSwap = true; }
  onCancel() { this.isSwap = false; }

  constructor(
    public positionService:PositionService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.positionService.selectedPosition = {
      _id: "",
      ep_id: "",
      name: "",
      name_en: ""
    }
    this.refreshPositionList();
  }

  onSubmit(form:NgForm){
    if(form.value._id == ""){
      Swal.fire({
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.positionService.addPosition(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshPositionList();
          })
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    } else {
      Swal.fire({
        title: 'ຕ້ອງການແກ້ໄຂຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.positionService.updatePosition(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshPositionList();
          })
          Swal.fire({
            icon: 'success',
            title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

  refreshPositionList() {
    this.positionService.getPositions().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.positionService.positions = res as Position[];
      },500);
    })
    this.onCancel();
  }

  onEdit( position:Position ) {
    this.positionService.selectedPosition = position;
    this.onSwap();
  }

  onDelete(_id:string, form:NgForm) {
    Swal.fire({
      title: 'ຕ້ອງການລຶບຂໍ້ມູນແທ້ບໍ?',
      text: "ຖ້າລຶບແລ້ວຈະບໍ່ສາມາດກູ້ຄືນໄດ້!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລຶບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(_id).subscribe((res) => {
          this.refreshPositionList();
          this.resetForm(form);
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
