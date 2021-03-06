import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../managements/products/products.service';
import { ProdTypeService } from '../../managements/prodtype/prodtype.service';
import { CategoryService } from '../../managements/categories/category.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  productList:any = [];

  categoryList:any = [];
  typeList:any = [];

  type_data:any = [];

  // store 
  saleList:any = [];

  grandTotal:number = 0;

  constructor(
    private proService:ProductsService,
    private typeService:ProdTypeService,
    private cateService:CategoryService
  ) { }

  ngOnInit(): void {
    
    this.cateService.getCategories().subscribe((res) => {
      this.categoryList = res;
    })
    
    this.typeService.getAllProdTypes().subscribe((res) => {
      this.typeList = res;
    });

    this.calculateGrandtotal();
  }

  onSelectCat(pc_id:any){
    let data = this.typeList.filter((res: {category:string}) => {
      return res.category.match(pc_id.target.value)
    });
    this.type_data = data;
  }

  // decrease product quantity
  decrease(pro_id:any, qty:any){
    for(let i=0; i<this.saleList.length; i++){
      if(this.saleList[i].pro_id === pro_id){
        if(qty != 1){
          this.saleList[i].qty = parseInt(qty)-1;
        }
      }
    }
    localStorage.setItem('posList',JSON.stringify(this.saleList));
    this.calculateGrandtotal();
  }

  // increase product quantity
  increase(pro_id:any, qty:any){
    for(let i=0; i<this.saleList.length; i++){
      if(this.saleList[i].pro_id === pro_id){
        if(qty != this.saleList[i].stock_qty){
          this.saleList[i].qty = parseInt(qty)+1;
        }
      }
    }
    localStorage.setItem('posList',JSON.stringify(this.saleList));
    this.calculateGrandtotal();
  }

  addItemToLits(items:any){
    let cartSaleNull = localStorage.getItem('posList');
     if(cartSaleNull == null){
      let storeDataGet:any = [];
      storeDataGet.push(items);
      localStorage.setItem('posList', JSON.stringify(storeDataGet));
    }else{
      var id = items.pro_id;
      let index:number = -1;
      this.saleList = JSON.parse(localStorage.getItem('posList'));
      for(let i=0; i<this.saleList.length; i++){
        if(parseInt(id) === parseInt(this.saleList[i].pro_id)){
          this.saleList[i].qty = items.qty;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.saleList.push(items);
        localStorage.setItem('posList', JSON.stringify(this.saleList));
      }else{
        localStorage.setItem('posList', JSON.stringify(this.saleList));
      }
    }
    this.calculateGrandtotal();
  }

  calculateGrandtotal(){
    if(localStorage.getItem('posList')){
      this.saleList = JSON.parse(localStorage.getItem('posList'));
      this.grandTotal = this.saleList.reduce(function(acc:any, val:any){
        return acc + (val.price*val.qty);
      },0)
    }
  }

  displayAllProduct(){
    this.proService.getProductToSale().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {qty:1, price: a.price*1.05})
      })
    });
  }

  filterProduct(selecttype:any){
    this.proService.getProductToSaleFilter(selecttype).subscribe(res => {
      this.productList = res;
      this.productList.forEach((a:any) => {
        Object.assign(a, {qty:1, price: a.price*1.05})
      })
    })
  }

  removeItem(item:any){
    if(localStorage.getItem('posList')){
      this.saleList = JSON.parse(localStorage.getItem('posList'))
      for(let i=0; i<this.saleList.length; i++){
        if(this.saleList[i].pro_id === item){
          this.saleList.splice(i, 1);
          localStorage.setItem('posList', JSON.stringify(this.saleList));
          this.calculateGrandtotal();
        }
      }
    }
  }

  emptyPOSList(){
    localStorage.removeItem('posList');
    this.saleList = [];
    this.grandTotal = 0;
  }

}
