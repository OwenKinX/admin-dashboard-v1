import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Supplier } from './supplier.model';

@Injectable({
    providedIn: 'root'
})

export class SupplierService {

    selectedSupplier:Supplier;
    suppliers:Supplier[];
    readonly api_url = 'http://localhost:8001/api';

    constructor(private http:HttpClient){}

    addSupplier( supplier:Supplier ) {
        return this.http.post(`${this.api_url}/supplier/add`, supplier);
    }

    getSuppliers(){
        return this.http.get(`${this.api_url}/suppliers`);
    }

    getSupplier( supplier:Supplier ) {
        return this.http.get(`${this.api_url}/supplier/${supplier._id}`);
    }

    updateSupplier( supplier:Supplier ) {
        return this.http.put(`${this.api_url}/supplier/update/${supplier._id}`, supplier);
    }

    deleteSupplier( _id:string ) {
        return this.http.delete(`${this.api_url}/supplier/delete/${_id}`);
    }
}