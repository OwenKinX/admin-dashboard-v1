import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Position } from './position.model';

@Injectable({
    providedIn: 'root'
})

export class PositionService {
   
    selectedPosition:Position;
    positions:Position[];
    readonly api_url = 'http://localhost:8001/api';

    constructor(private http:HttpClient) {}

    addPosition( position:Position ) {
        return this.http.post(`${this.api_url}/position/add`, position);
    }

    getPositions(){
        return this.http.get(`${this.api_url}/positions`);
    }

    getPosition( position:Position ){
        return this.http.get(`${this.api_url}/position/${position._id}`);
    }

    updatePosition( position:Position ) {
        return this.http.put(`${this.api_url}/position/update/${position._id}`, position);
    }

    deletePosition(_id:string) {
        return this.http.delete(`${this.api_url}/position/delete/${_id}`);
    }
}