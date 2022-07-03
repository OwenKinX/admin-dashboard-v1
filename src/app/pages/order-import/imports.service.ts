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

    AddImportDetail( importdetail:any ){
        return this.http.post(`${this.api_url}/importdetail/add`,importdetail)
    }

    // get all data method
    getAllImports(){
        return this.http.get<any>(`${this.api_url}/imports`);
    }

    // get one data method
    getImports( id:string ){
        return this.http.get<any>(`${this.api_url}/imports/${id}`);
    }

    getImportDetail(imp_no:string){
        return this.http.get<any>(`${this.api_url}/importdetail/${imp_no}`);
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
        return this.http.get<any>(`${this.api_url}/imports/reports`);
    }

    filterImpReport(date:any){
        return this.http.get<any>(`${this.api_url}/imports/report?date=${date}`);
    }

    expanseDailyReport(){
        return this.http.get<any>(`${this.api_url}/expanse/daily`);
    }

    monthExpanseReport(){
        return this.http.get<any>(`${this.api_url}/expanse/report`);
    }

    monthlyExpanseReport(month:any){
        return this.http.get<any>(`${this.api_url}/expanse/monthly?month=${month}`);
    }

    sixMonthExpanse(){
        return this.http.get<any>(`${this.api_url}/expanse/sixmonth`);
    }

    yearlyExpanseReport(){
        return this.http.get<any>(`${this.api_url}/expanse/yearly`);
    }
}