import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from './category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})

export class CategoriesComponent implements OnInit {

  isSwap:boolean = false;
  dtOptions:DataTables.Settings = {};

  constructor(
    public categoryService:CategoryService,
    private spinner:NgxSpinnerService
  ) {  }

  ngOnInit(): void {
    this.resetForm();
    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onSwap() { this.isSwap = true; }
  onCancel() { this.isSwap = false; }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.categoryService.selectedCategory = {
      _id: "",
      pc_id:"",
      name: "",
      name_en: ""
    }
    this.refreshCategoryList();
  }

  onSubmit(form:NgForm) {
    if(form.value._id == ""){
      Swal.fire({
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.categoryService.addCategory(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshCategoryList();
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
          this.categoryService.updateCategory(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshCategoryList();
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

  refreshCategoryList() {
    this.categoryService.getCategories().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.categoryService.categories = res as Category[];
      },500);
    })
    this.onCancel();
  }

  onEdit( category:Category ) {
    this.categoryService.selectedCategory = category;
    this.onSwap();
  }
  onDelete(_id:any, form:NgForm) {
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
        this.categoryService.deleteCategory(_id).subscribe((res) => {
          this.refreshCategoryList();
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
