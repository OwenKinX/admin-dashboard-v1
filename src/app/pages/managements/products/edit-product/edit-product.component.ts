import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from '../products.service';
import { ProdTypeService } from '../../prodtype/prodtype.service';
import { UnitsService } from '../../units/units.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  updateProductForm:FormGroup;

  typeList:any = [];
  unitList:any = [];
  imagePrev:string;
  getId:any;
  product:Product;

  constructor(
    private productService:ProductsService,
    private typeService:ProdTypeService,
    private unitService:UnitsService,
    private activeRoute:ActivatedRoute
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

    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProduct(this.getId).subscribe((res) => {
      this.updateProductForm.setValue({
        pro_id:res['pro_id'],
        name:res['name'],
        price:res['price'],
        description:res['description'],
        stock_qty:res['stock_qty'],
        type:res['type'],
        unit:res['unit'],
        image:res['image']
      })
    })

    this.updateProductForm = new FormGroup({
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
    this.updateProductForm.patchValue({image:file});
    this.updateProductForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdate():any {
    this.productService.updateProduct(
      this.getId,
      this.updateProductForm.value.pro_id,
      this.updateProductForm.value.name,
      this.updateProductForm.value.price,
      this.updateProductForm.value.description,
      this.updateProductForm.value.stock_qty,
      this.updateProductForm.value.type,
      this.updateProductForm.value.unit,
      this.updateProductForm.value.image
    )
  }
}
