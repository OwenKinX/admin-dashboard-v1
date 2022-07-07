import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { SaleDetail } from "./saleDetail.model";
const api_key = 'coinranking1ac7366644b7425d1fc8620a69271a70b13465e7968f909a';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${api_key}`,
      'Access-Control-Allow-Origin': '*',
    }),
};

@Injectable({ providedIn: 'root'})
export class SaleDetailService {

    selectedSaleDetail:SaleDetail;
    saleDetail:SaleDetail[];

    readonly api_url = 'http://localhost:8001/api';

    private baseUrl = 'https://api.coinranking.com/v2/coins';
    private proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    constructor(
        private http:HttpClient
    ){}

    AddSaleDetail( saleDetail:any ){
        return this.http.post(`${this.api_url}/saledetail/add`, saleDetail);
    }

    decreaseStock(saleDetail:any){
        return this.http.patch(`${this.api_url}/saledetail/add`, saleDetail);
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

    SaleDetailReportByQueryString(startdate:any, lastdate:any){
        return this.http.get<any>(`${this.api_url}/saledetail/report?startdate=${startdate}&lastdate=${lastdate}`);
    }

    getBillReceipt(invno:string){
        return this.http.get<any>(`${this.api_url}/sales/receipt?inv_no=${invno}`);
    }

    // present month income report
    monthIncomeReport(){
        return this.http.get<any>(`${this.api_url}/income/report`);
    }

    // Daily income report
    dailyIncomeReport(){
        return this.http.get(`${this.api_url}/income/daily`);
    }

    monthlyIncomeReport(month:any){
        return this.http.get(`${this.api_url}/income/monthly?month=${month}`);
    }

    // Monthly
    sixmonthIncomeReport(){
        return this.http.get(`${this.api_url}/income/sixmonth`);
    }

    // Yearly
    yearlyIncomeReport(){
        return this.http.get(`${this.api_url}/income/yearly`);
    }

    cryptoData() {
        const url = `${this.proxyUrl}${this.baseUrl}`;
        return this.http.get(url, httpOptions);
    }

}