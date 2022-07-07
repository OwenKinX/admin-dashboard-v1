import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sales } from './sales.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }

  readonly api_url = 'http://localhost:8001/api';

  AddSale( data:Sales ){
    return this.http.post(`${this.api_url}/sales/add`, data);
  }

  getAllSales(){
    return this.http.get<any>(`${this.api_url}/sales`);
  }

  getOnlineSales(){
    return this.http.get<any>(`${this.api_url}/sales/online`);
  }

  getSale(id:string){
    return this.http.get<any>(`${this.api_url}/sales/${id}`);
  }

  updateSales(id:string, data:any){
    return this.http.put(`${this.api_url}/sales/update/${id}`, data);
  }

  deleteSale(id:string){
    return this.http.delete(`${this.api_url}/sales/delete/${id}`);
  }

}
