import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SaleDetail } from "./saleDetail.model";

@Injectable({ providedIn: 'root'})
export class SaleDetailService {

    selectedSaleDetail:SaleDetail;
    saleDetail:SaleDetail[];

    readonly api_url = 'http://localhost:8001/api';

    constructor(
        private http:HttpClient
    ){}

    AddSaleDetail( saleDetail:any ){
        return this.http.post(`${this.api_url}/saledetail/add`, saleDetail);
    }

    // GetAllSaleDetail(){
    //     return this.http.get(`${this.api_url}/saledetail`);
    // }

    GetSaleDetailByInvNo(inv_no:string){
        return this.http.get(`${this.api_url}/saledetails/${inv_no}`);
    }

    GetSaleDetail( saleDetail:SaleDetail ){
        return this.http.get(`${this.api_url}/${saleDetail._id}`);
    }

    UpdateSaleDetail( saleDetail:SaleDetail ){
        return this.http.put(`${this.api_url}/saledetail/update/${saleDetail._id}`, saleDetail);
    }

    // DeleteSaleDetail( _id:string ){
    //     return this.http.delete(`${this.api_url}/saledetail/delete/${_id}`);
    // }

    DeleteByInvNo( inv_no:string ){
        return this.http.delete(`${this.api_url}/saledetail/deletes/${inv_no}`);
    }

    SaleDetailReport(){
        return this.http.get<any>(`${this.api_url}/saledetail/reports`);
    }

    SaleDetailReportByQueryString(saledate:any){
        return this.http.get<any>(`${this.api_url}/saledetail/report?saledate=${saledate}`);
    }

    // Year income report
    yearIncomeReport(){
        return this.http.get<any>(`${this.api_url}/saledetail/amount`);
    }

    // Monthly income report
    monthIncomeReport(){
        return this.http.get<any>(`${this.api_url}/income/report`);
    }

}