import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Conreol-Allow-Origin': '*',
    'Access-Control-Allow-Header':'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LaosAreasService {

  readonly api_url = 'https://laos-areas-api.herokuapp.com/laos';
  readonly api_url1:string = 'https://owenkinx.github.io/laos-areas';

  constructor(private http:HttpClient) { }

  // get all provinces data
  getProvinces() {
    // return this.http.get<any>(`${this.api_url1}/provinces.json`,httpOptions);
    return this.http.get<any>(`${this.api_url}/provinces`);
  }

  // get all districts data
  getDistricts() {
    return this.http.get<any>(`${this.api_url}/districts`);
  }

  // get all villages data 😮
  getVillages() {
    return this.http.get<any>(`${this.api_url}/villages`);
  }
}
