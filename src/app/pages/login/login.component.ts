import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
      form.resetForm();
    }
  }

  ngOnInit(): void {

  }

}
