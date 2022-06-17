import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable({ providedIn:'root' })

export class EmpService {
    constructor(
        private http:HttpClient,
        private router:Router,
        private ngZone:NgZone
    ) {}

    readonly api_url = 'http://localhost:8001/api';

    AddEmp(
        emp_id:string,
        name:string,
        surname:string,
        gender:string,
        dob:string,
        phone:any,
        email:string,
        province:string,
        district:string,
        village:string,
        position:string,
        image:File
    ){
        const formData = new FormData();
        formData.append('emp_id', emp_id);
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('gender', gender);
        formData.append('dob', dob);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('province', province);
        formData.append('district', district);
        formData.append('village', village);
        formData.append('position', position);
        formData.append('image', image, name)
        return this.http.post(`${this.api_url}/emp/add`, formData);
    }

    getEmps(){
        return this.http.get(`${this.api_url}/employees`);
    }

    getEmployeeReport():Observable<any>{
        return this.http.get(`${this.api_url}/employees/reports`);
    }

    getEmployeeReportByPosition(position):Observable<any>{
        return this.http.get(`${this.api_url}/employees/report?ep_id=${position}`);
    }

    getEmp( _id:string ){
        return this.http.get<{
            _id:string,
            emp_id:string,
            name:string,
            surname:string,
            gender:string,
            dob:string,
            phone:number,
            email:string,
            province:string,
            district:string,
            village:string,
            position:string,
            image:string
        }>(`${this.api_url}/employee/${_id}`);
    }

    updateEmp( 
        _id:string,
        emp_id:string,
        name:string,
        surname:string,
        gender:string,
        dob:string,
        phone:any,
        email:string,
        province:string,
        district:string,
        village:string,
        position:string,
        image:File | string
    ){
        let formData:Employee | FormData;
        if(typeof image === "object"){
            formData = new FormData();
            formData.append('emp_id', emp_id);
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('gender', gender);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('province', province);
            formData.append('district', district);
            formData.append('village', village);
            formData.append('position', position);
            formData.append('image', image, name)
        }else{
            formData = {
                _id:_id,
                emp_id:emp_id,
                name:name,
                surname:surname,
                gender:gender,
                dob:dob,
                phone:phone,
                email:email,
                province:province,
                district:district,
                village:village,
                position:position,
                image:image
            }
        }
        return this.http.put<any>(`${this.api_url}/emp/update/${_id}`, formData).subscribe((res) => {
            Swal.fire({
                icon: 'question',
                title: 'ຕ້ອງການແກ້ໄຂຂໍ້ມູນບໍ່ ?',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'ຕົກລົງ',
                cancelButtonText: 'ຍົກເລີກ'
            }).then(result => {
                if(result.isConfirmed){
                    Swal.fire({
                        title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                this.ngZone.run(() => this.router.navigate(['/list-emp']))
            })
        });
    }

    deleteEmp( _id:string ){
        return this.http.delete(`${this.api_url}/emp/delete/${_id}`);
    }
}