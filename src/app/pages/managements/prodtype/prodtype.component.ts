import { Component, OnInit } from '@angular/core';
import { ProdTypeService } from './prodtype.service';
import { CategoryService } from '../categories/category.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { ProdType } from './prodtype.model';

@Component({
  selector: 'app-prodtype',
  templateUrl: './prodtype.component.html',
  styleUrls: ['./prodtype.component.css'],
  providers: [ProdTypeService]
})
export class ProdtypeComponent implements OnInit {

  isSwap:boolean = false;

  categoryList:any = [];
  dtOptions:DataTables.Settings = {};

  constructor(
    public prodtypeService:ProdTypeService,
    private categoryService:CategoryService,
    private spinner:NgxSpinnerService 
  ) {}

  onSwap() { this.isSwap = true; }
  onCancel() { this.isSwap = false; }

  ngOnInit(): void {
    this.resetForm();
    this.categoryService.getCategories().subscribe((res) => {
      this.categoryList = res
    })
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.prodtypeService.selectedProdType = {
      _id: "",
      pt_id:"",
      name: "",
      name_en: "",
      category: ""
    }
    this.refreshTypeList();
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
          this.prodtypeService.addProdType(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshTypeList();
          })
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500	
          })
        }
      })  
    }else{
      Swal.fire({
        title: 'ຕ້ອງການແກ້ໄຂຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.prodtypeService.updateProdType(form.value).subscribe((res) => {
            this.resetForm();
            this.refreshTypeList();
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

  refreshTypeList(){
    this.prodtypeService.getAllProdTypes().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.prodtypeService.prodtypes = res as ProdType[];
      },500)
    })
    this.onCancel();
  }

  onEdit( prodtype:ProdType ){
    this.prodtypeService.selectedProdType = prodtype;
    this.onSwap();
  }

  onDelete(_id:string, form:NgForm) {
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
        this.prodtypeService.deleteProdType(_id).subscribe((res) => {
          this.resetForm();
          this.refreshTypeList();
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
