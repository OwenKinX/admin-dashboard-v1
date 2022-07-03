import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  cartLists:any = [];
  cartList:any = [];

  c_name_temp:any;
  c_tel_temp:any;
  c_email_temp:any;
  c_province_temp:any;
  c_district_temp:any;
  c_village_temp:any;

  c_name:string;
  c_tel:number;
  c_email:string;
  c_province:string;
  c_district:string;
  c_village:string;


  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.cartService.GetCart().subscribe((res) => {
      this.cartLists = res;
    });
    this.cartList.forEach((a:any)=>{
      Object.assign(a, {price:a.price*1.05});
    });
  }

  getUserDetail(id:any){
    this.cartService.getUserCart(id).subscribe( data => {
      this.cartList = data;

      this.c_name_temp = this.cartList.map((arr:any) => arr.c_name);
      this.c_tel_temp = this.cartList.map((arr:any) => arr.c_tel);
      this.c_email_temp = this.cartList.map((arr:any) => arr.c_email);
      this.c_province_temp = this.cartList.map((arr:any) => arr.c_address.province);
      this.c_district_temp = this.cartList.map((arr:any) => arr.c_address.district);
      this.c_village_temp = this.cartList.map((arr:any) => arr.c_address.village);

      this.c_name = this.c_name_temp[0];
      this.c_tel = this.c_tel_temp[0];
      this.c_email =  this.c_email_temp[0];
      this.c_province = this.c_province_temp[0];
      this.c_district = this.c_district_temp[0];
      this.c_village = this.c_village_temp[0];

      this.cartList.forEach((a:any)=>{
        Object.assign(a, {price:a.price*1.05});
      });
    })
  }

  onDelete(id:any,){
    this.cartService.DeleteCart(id).subscribe(() => {
      
    })
  }
}
