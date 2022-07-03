import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  Products:any = [];
  getId:any;

  constructor(
    private productService:ProductsService,
    private activeRoute:ActivatedRoute,
    private spinService:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.productService.getProductInfo(this.getId).subscribe((res) => {
      this.spinService.show()
      setTimeout(() => {
        this.Products = res;
        this.spinService.hide();
      },500)
    })
  }

}
