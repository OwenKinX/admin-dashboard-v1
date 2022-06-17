import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  selectedCategory:Category;
  categories:Category[];
  readonly api_url = 'http://localhost:8001/api';

  constructor(private http:HttpClient) { }

  addCategory( category:Category ) {
    return this.http.post(`${this.api_url}/category/add`, category)
  }

  getCategories(){
    return this.http.get(`${this.api_url}/categories`);
  }

  getCategory( category:Category ) {
    return this.http.get(`${this.api_url}/category/${category._id}`);
  }

  updateCategory( category:Category ) {
    return this.http.put(`${this.api_url}/category/update/${category._id}`, category);
  }

  deleteCategory( _id:string ) {
    return this.http.delete(`${this.api_url}/category/delete/${_id}`);
  }
}
