import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/pages/managements/products/products.service';
import { ProdTypeService } from 'src/app/pages/managements/prodtype/prodtype.service';
import { UnitsService } from 'src/app/pages/managements/units/units.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-prodmodal',
  templateUrl: './add-prodmodal.component.html',
  styleUrls: ['./add-prodmodal.component.css']
})
export class AddProdmodalComponent implements OnInit {

  productForm:FormGroup;

  imagePrev:string;

  productList:any = [];
  typeList:any = [];
  unitList:any = [];

  constructor(
    private productService:ProductsService,
    private typeService:ProdTypeService,
    private unitService:UnitsService
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

    this.productForm = new FormGroup({
      pro_id: new FormControl(null, {validators: [Validators.required]}),
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
    console.log(file)
    reader.readAsDataURL(file);
  }
  generateId(length:any) {
    let text = "PRO-";
    const possible = "012345789";
    for(let i = 0; i < length; i++)  {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }
  onSubmit():any{
    this.productService.addProduct(
      this.productForm.value.pro_id,
      this.productForm.value.name,
      this.productForm.value.price,
      this.productForm.value.description,
      this.productForm.value.stock_qty,
      this.productForm.value.type,
      this.productForm.value.unit,
      this.productForm.value.image
    )
    this.productForm.reset();
  }

}
