import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {

  cartList:any = [];

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.cartService.GetCart().subscribe((res) => {
      this.cartList = res;
    })
  }

  onDelete(id:any, i:any){
    this.cartService.DeleteCart(id).subscribe(() => {
      this.cartList.splice(i,1);
    })
  }
}
