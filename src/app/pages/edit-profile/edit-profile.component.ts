import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  updateForm:FormGroup;

  adminProfile:any;
  getId:any;



  constructor(
    private authService:AuthService,
    private router:Router,
    private ngZone:NgZone
  ) { }

  ngOnInit(): void {

    this.updateForm = new FormGroup({
      name: new FormControl(null,Validators.required),
      username: new FormControl(null),
      email: new FormControl(null,Validators.required),
      phone: new FormControl(null,Validators.required)
    })

    this.getId = sessionStorage.getItem('admin');
    this.authService.getAdminProfile(this.getId).subscribe( data => {
      this.updateForm.setValue({
        name: data['name'],
        username: data['username'],
        phone: data['phone'],
        email: data['email']
      })
    })
  }

  onUpdateProfile(){
    if(this.updateForm.invalid){
      return;
    }else{
      this.authService.updateAdminProfile(this.getId, this.updateForm.value).subscribe( res => {
        Swal.fire({
          icon: 'success',
          title: 'ແກ້ໄຂໂປຣໄຟລ໌ສຳເລັດ',
          timer: 1500
        });
        this.ngZone.run(() => this.router.navigate(['/profile']))
      })
    }
  }

}
