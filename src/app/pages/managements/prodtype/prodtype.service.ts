import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ProdType } from "./prodtype.model";

@Injectable({
    providedIn: 'root'
})

export class ProdTypeService {
    
    selectedProdType:ProdType;
    prodtypes:ProdType[];
    readonly api_url = 'http://localhost:8001/api';

    constructor(private http:HttpClient) {}
    
    addProdType( prodtype:ProdType ) {
        return this.http.post(`${this.api_url}/type/add`, prodtype);
    }

    getAllProdTypes() {
        return this.http.get(`${this.api_url}/types`);
    }

    getProdType( prodtype:ProdType ) {
        return this.http.get(`${this.api_url}/type/${prodtype._id}`) ;
    }

    updateProdType( prodtype:ProdType ) {
        return this.http.put(`${this.api_url}/type/update/${prodtype._id}`, prodtype);
    }

    deleteProdType( _id:string ) {
        return this.http.delete(`${this.api_url}/type/delete/${_id}`);
    }

}