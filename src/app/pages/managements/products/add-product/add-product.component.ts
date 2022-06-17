import { Component, OnInit, NgZone } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProdTypeService } from '../../prodtype/prodtype.service';
import { UnitsService } from '../../units/units.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm:FormGroup;
  imagePrev:string;

  typeList:any = [];
  unitList:any = [];

  genProId:any = "8850";

  constructor(
    private productService:ProductsService,
    private typeService:ProdTypeService,
    private unitService:UnitsService,
    private router:Router,
    private ngZone:NgZone,
  ) { }

  ngOnInit(): void {

    // get all type
    this.typeService.getAllProdTypes().subscribe((res) => {
      this.typeList = res;
    })

    // get all unit
    this.unitService.getUnits().subscribe((res) => {
      this.unitList = res;
    })

    const possible = "0123456789";
    for(let i = 0; i < 9; i++)  {
      this.genProId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.productForm = new FormGroup({
      pro_id: new FormControl(this.genProId),
      name: new FormControl(null, {validators: [Validators.required]}),
      price: new FormControl(null, {validators: [Validators.required]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      stock_qty: new FormControl(null, {validators: [Validators.required]}),
      type: new FormControl(null, {validators: [Validators.required]}),
      unit: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null)
    })
  }

  onImagePicked(e:Event){
    const file = (e.target as HTMLInputElement).files[0];
    this.productForm.patchValue({image:file});
    this.productForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit():any{
    Swal.fire({
      title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.productService.addProduct(
          this.productForm.value.pro_id,
          this.productForm.value.name,
          this.productForm.value.price,
          this.productForm.value.description,
          this.productForm.value.stock_qty,
          this.productForm.value.type,
          this.productForm.value.unit,
          this.productForm.value.image
        ).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          })
          this.productForm.reset();
          this.ngZone.run(() => this.router.navigate(['/list-product']));
        })
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err,
        showConfirmButton: true,
      })
    })
  }
}
