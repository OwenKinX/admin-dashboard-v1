import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaosAreasService {

  readonly api_url = 'https://laos-areas-api.herokuapp.com/laos';

  constructor(private http:HttpClient) { }

  // get all provinces data
  getProvinces() {
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
