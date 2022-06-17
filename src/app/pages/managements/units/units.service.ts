import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root'
})

export class UnitsService {
  selectedUnit:Unit;
  units:Unit[];
  readonly api_url = 'http://localhost:8001/api';

  constructor(private http:HttpClient) { }

  addUnit( unit:Unit ) {
    return this.http.post(`${this.api_url}/unit/add`, unit);
  }

  getUnits() {
    return this.http.get(`${this.api_url}/units`);
  }

  getUnit( unit:Unit ) {
    return this.http.get(`${this.api_url}/unit/${unit._id}`);
  }

  updateUnit(unit:Unit) {
    return this.http.put(`${this.api_url}/unit/update/${unit._id}`, unit);
  }

  deleteUnit(_id:string) {
    return this.http.delete(`${this.api_url}/unit/delete/${_id}`);
  }

}
