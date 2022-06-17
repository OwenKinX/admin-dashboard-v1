import { Directive } from '@angular/core';
import { ProductsService } from '../pages/managements/products/products.service';

@Directive({
  selector: '[appHttpProduct]'
})
export class HttpProductDirective {

  constructor(
    private service:ProductsService
  ) { }

}
