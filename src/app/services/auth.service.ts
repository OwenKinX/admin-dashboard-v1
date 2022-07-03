import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AdminData } from './admin-data';
import { LoginData } from './login-data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = false;
  private token:string;
  private tokenTimer:any;
  private authStatusListener = new Subject<boolean>();

  adminId:any;

  api_url:string = 'http://localhost:8001/admin';
  
  constructor(private http:HttpClient, public router:Router) {  }

  getToken(){
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    name:string,
    username:string,
    phone:number,
    email:string,
    password:string
  ){
    const adminData:AdminData = {
      name: name,
      username: username,
      phone: phone,
      email: email,
      password: password
    } 
    this.http.post<{email:string}>(`${this.api_url}/register`, adminData).subscribe( response => {
      this.router.navigate(['login'])
    })
  }

  loginUser(
    email:string,
    password:string
  ){
    const loginData:LoginData = {
      email: email,
      password: password
    }
    this.http.post<{ user:string, message:string, token:string, expiresIn:number }>(`${this.api_url}/login`, loginData).subscribe(response => {
      const token = response.token;
      const id = response.user;
      this.adminId = id;
      this.token = token;
      if(token){
        const expiresDuration = response.expiresIn;
        this.setAuthTimer(expiresDuration); 
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expiresDate = new Date(now.getTime() + expiresDuration * 1000);
        this.saveAuthData(id, token, expiresDate);
        this.router.navigate(['home']);
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1000
      })

    }, error => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.mesaage,
        showConfirmButton: false,
        timer: 1000
      });
    });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiresDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getAdminProfile(adminId:string){
    return this.http.get<any>(`${this.api_url}/profile/${adminId}`)
  }

  updateAdminProfile(id:any, data:any){
    return this.http.put<any>(`${this.api_url}/profile/update/${id}`, data);
  }

  updateAdminPassword(data:any){
    return this.http.patch<any>(`${this.api_url}/update/password`, data)
  }

  logout(){
    // this.token = null;
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['login']);
  }

  private setAuthTimer(duration:number) {
    console.log(`Setting timer: ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData( id:string, token:string, expiresDate:Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresDate.toUTCString());
    sessionStorage.setItem('admin', id);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    sessionStorage.removeItem('admin');
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expiresDate = localStorage.getItem("expiresIn");
    if(!token || !expiresDate) {
      return;
    }
    return {
      token: token,
      expiresDate: new Date(expiresDate)
    }
  }
}
