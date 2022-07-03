import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassForm:FormGroup;

  userIsAuthenticated = false;
  private authListenerSubs:Subscription;

  constructor( private authService:AuthService ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.changePassForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      con_password: new FormControl()
    })
  }

  onUpdatePassword(){
    if(this.changePassForm.invalid){
      return;
    }else if(this.changePassForm.value.password !== this.changePassForm.value.con_password){
      Swal.fire({
				icon: 'error',
				title: 'ລະຫັດຜ່ານບໍ່ກົງກັນ',
				text: 'ກະລຸນາກວດສອບຄືນໃໝ່',
				showConfirmButton: true,
			})
    }else{
      this.authService.updateAdminPassword(this.changePassForm.value).subscribe( res => {
        Swal.fire({
          icon: 'success',
          title: 'ແກ້ໄຂລະຫັດຜ່ານສຳເລັດ',
          timer: 2000
        })
      })
      this.clearForm();
    }
  }

  clearForm(){
    this.changePassForm.reset();
  }

}
