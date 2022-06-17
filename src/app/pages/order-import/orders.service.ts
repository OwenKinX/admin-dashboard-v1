import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Orders } from './orders.model';

@Injectable({ providedIn: 'root' })
export class OrdersService {

    selectedOrder:Orders;
    orders:Orders[];
    readonly api_url = 'http://localhost:8001/api';

    constructor(private http:HttpClient) {}

    AddOrder( orders:Orders ){
        return this.http.post(`${this.api_url}/order/add`, orders);
    }

    GetAllOrder(){
        return this.http.get(`${this.api_url}/order`);
    }

    GetOrder(orders:Orders){
        return this.http.get(`${this.api_url}/order/${orders._id}`);
    }

    UpdateOrder(orders:Orders){
        return this.http.put(`${this.api_url}/order/update/${orders._id}`,orders);
    }

    DeleteOrder(_id:string){
        return this.http.delete(`${this.api_url}/order/delete/${_id}`);
    }
}