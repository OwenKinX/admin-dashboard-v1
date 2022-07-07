import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  readonly api_url = 'http://localhost:8001/api';

  constructor(private http:HttpClient) { }
  
  AddUser( user:User ):Observable<any>{
    return this.http.post(`${this.api_url}/customer/add`, user);
  }

  getUsers(){
    return this.http.get(`${this.api_url}/customers`);
  }

  getUser( id:any ){
    return this.http.get<any>(`${this.api_url}/customer/${id}`).pipe(map((res:any) => {
      return res || {}
    }))
  }

  getUserProfile(id:any){
    return this.http.get(`http://localhost:8001/customer/profile/${id}`);
  }

  updateUser( id:any,user:any ){
    return this.http.put(`${this.api_url}/customer/update/${id}`, user);
  }

  deleteUser(id:any){
    return this.http.delete(`${this.api_url}/customer/delete/${id}`)
  }
}
