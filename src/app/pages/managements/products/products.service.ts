import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private ngZone:NgZone,
  ) { }

  readonly api_url = 'http://localhost:8001/api';

  addProduct(
    pro_id:string,
    name:string,
    price:any,
    description:string,
    stock_qty:any,
    type:string,
    unit:string,
    image:File
  ){
    const formData = new FormData();
    formData.append('pro_id', pro_id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock_qty', stock_qty);
    formData.append('type', type);
    formData.append('unit', unit);
    formData.append('image', image, name);
    return this.http.post(`${this.api_url}/product/add`, formData);
  }

  getAllProduct() {
    return this.http.get(`${this.api_url}/products`);
  }

  getProductToSale(){
    return this.http.get<any>(`${this.api_url}/products/sales`);
  }

  getProductToSaleFilter(selecttype:any){
    return this.http.get<any>(`${this.api_url}/products/sale?type=${selecttype}`);
  }

  getProductToOrder(){
    return this.http.get<any>(`${this.api_url}/products/order`);
  }

  getStockproduct(){
    return this.http.get(`${this.api_url}/products/sum/stock`)
  }

  getProduct( _id:string ){
    return this.http.get<{
      _id:string,
      pro_id:string,
      name:string,
      price:number;
      description:string,
      stock_qty:number,
      type:string,
      unit:string,
      image:string
    }>(`${this.api_url}/product/${_id}`);
  }

  getProductInfo( _id:string ){
    return this.http.get<any>(`${this.api_url}/products/info?id=${_id}`)
  }

  updateProduct(
    _id:string,
    pro_id:string,
    name:string,
    price:any,
    description:string,
    stock_qty:any,
    type:string,
    unit:string,
    image:File
  ) {
    let formData:Product | FormData;
    if(typeof(image) === "object") {
      formData = new FormData();
      formData.append('_id', _id);
      formData.append('pro_id', pro_id);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('stock_qty', stock_qty);
      formData.append('type', type);
      formData.append('unit', unit);
      formData.append('image', image, name);
    }else{
      formData = {
        _id: _id,
        pro_id:pro_id,
        name:name,
        price:price,
        description:description,
        stock_qty:stock_qty,
        type:type,
        unit:unit,
        image:image
      }
    }
    this.http.put<any>(`${this.api_url}/product/update/${_id}`, formData).subscribe((res) => {
      Swal.fire({
        icon: 'question',
        title: 'ຕ້ອງການແກ້ໄຂຂໍ້ມູນບໍ່ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then( result => {
        if(result.isConfirmed){
          Swal.fire({
            title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          this.ngZone.run(() => this.router.navigate(['/list-product']))
        }
      })
    });
  }

  productReport(){
    return this.http.get<any>(`${this.api_url}/products/reports`);
  }

  getProductByType(type:string){
    return this.http.get(`${this.api_url}/products/report?type=${type}`);
  }

  productAmount(){
    return this.http.get<any>(`${this.api_url}/products/amount`);
  }

  deleteProduct(_id:string) {
    return this.http.delete(`${this.api_url}/product/delete/${_id}`);
  }
}
