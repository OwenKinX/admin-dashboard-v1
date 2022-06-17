import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Imports } from './imports.model';

@Injectable({ providedIn: 'root' })
export class ImportsService {

    constructor(private http:HttpClient) {}

    readonly api_url = 'http://localhost:8001/api';

    // add imports data method
    AddImports( data:Imports ){
        return this.http.post(`${this.api_url}/imports/add`, data);
    }

    // get all data method
    getAllImports(){
        return this.http.get<any>(`${this.api_url}/imports`);
    }

    // get one data method
    getImports( id:string ){
        return this.http.get<{
            _id:string,
            imp_no:string,
            c_price:any,
            imp_qty:any,
            date:string,
            bill_no:any,
            product:string,
            order:string,
            employee:string
        }>(`${this.api_url}/imports/${id}`);
    }

    // update data method
    updateImports( id:string, data:any ){
        return this.http.put(`${this.api_url}/imports/update/${id}`, data);
    }

    // delete data method
    deleteImports( id:string ){
        return this.http.delete(`${this.api_url}/imports/delete/${id}`);
    }

    getImpReport(){
        return this.http.get(`${this.api_url}/imports/report`);
    }

    getTotalAmount(){
        return this.http.get(`${this.api_url}/imports/amount`);
    }

}