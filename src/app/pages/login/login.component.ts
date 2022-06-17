import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(
    public fb:FormBuilder,
    private authService:AuthService,
  ) {}

  onLogin(form:NgForm) {
    if (form.invalid){
			return;
		}
    else{
      this.authService.loginUser(
        form.value.email,
        form.value.password
      )
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
        showConfirmButton: false,
        timer: 1000
      })
      form.resetForm();
    }
  }

  ngOnInit(): void {

  }

}
