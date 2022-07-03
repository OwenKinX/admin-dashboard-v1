import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  
  productList: any = [];
  dtOptions:DataTables.Settings = {};

  constructor(
    private productService: ProductsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // get all product
    this.productService.getAllProduct().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.productList = res;
        this.spinner.hide();
      },500)
    });

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

  onDelete(_id:string, i:any){
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
        this.productService.deleteProduct(_id).subscribe((res) => {
          this.productList.splice(i,1)
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
