import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Cart } from "./cart.model";

@Injectable({
    providedIn: 'root'
})
export class CartService{
    constructor(
        private http:HttpClient
    ){}
    readonly api_url = 'http://localhost:8001/api';

    GetCart(){
        return this.http.get(`${this.api_url}/cart/users`);
    }

    getUserCart(id:any){
        return this.http.get(`${this.api_url}/cart/user?id=${id}`);
    }

    DeleteCart(id:any){
        return this.http.delete(`${this.api_url}/cart/delete/${id}`);
    }
}