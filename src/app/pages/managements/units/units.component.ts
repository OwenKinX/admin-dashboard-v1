import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UnitsService } from './units.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { Unit } from './unit.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
  providers: [UnitsService]
})
export class UnitsComponent implements OnInit {

  isSwap:boolean = false;
  dtOptions:DataTables.Settings = {};

  constructor(
    public unitService:UnitsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit():void {
    this.resetForm();
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onSwap() { this.isSwap = true; }
  onCancel() { this.isSwap = false; }

  resetForm(form?:NgForm){
    if (form)
      form.reset();
    this.unitService.selectedUnit = {
      _id: "",
      symbol: "",
      name: "",
      name_en: ""
    }
    this.refreshUnitList();
  }
  
  onSubmit(form:NgForm) {
    if(form.value._id == "") {
      Swal.fire({
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.unitService.addUnit(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshUnitList();
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
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.unitService.updateUnit(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshUnitList();
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

  refreshUnitList() {
    this.unitService.getUnits().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.unitService.units = res as Unit[];
      },500);
    })
    this.onCancel();
  }

  onEdit( unit:Unit ) {
    this.unitService.selectedUnit = unit;
    this.onSwap();
  }

  onDelete(_id:string, form: NgForm) {
    Swal.fire({
      title: 'ຕ້ອງການລຶບຂໍ້ມູນແທ້ບໍ ?',
      text: "ຖ້າລຶບແລ້ວຈະບໍ່ສາມາດກູ້ຄືນໄດ້!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລຶບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unitService.deleteUnit(_id).subscribe((res) => {
          this.refreshUnitList();
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
