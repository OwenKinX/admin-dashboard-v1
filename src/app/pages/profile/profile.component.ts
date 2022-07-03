import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentAdmin: Object = {};

  getId:any;
  adminProfile:any;

  username:string;
  name:string;
  email:string;
  tel:number;
  _id:string;

  constructor(
    public authService:AuthService
  ) { 
    
  }

  ngOnInit(): void {
    this.getId = sessionStorage.getItem('admin')
    this.authService.getAdminProfile(this.getId).subscribe( admin => {
      // this.adminProfile = [admin];
      this.adminProfile = admin;

      this.username = admin.username;
      this.name = admin.name;
      this.email = admin.email;
      this.tel = admin.phone;
      this._id = admin._id
    });
  }

}
