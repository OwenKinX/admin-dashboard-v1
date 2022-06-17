import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	constructor(
		public fb:FormBuilder,
		public authService:AuthService,
		public router:Router,
	) { 
		
	}

	onRegister(form:NgForm) {
		if(form.invalid){
			return;
		}else if(form.value.password !== form.value.con_password){
			Swal.fire({
				icon: 'error',
				title: 'ລະຫັດຜ່ານບໍ່ກົງກັນ',
				text: 'ກະລຸນາກວດສອບຄືນໃໝ່',
				showConfirmButton: true,
			})
		}else{
			this.authService.createUser(
				form.value.name,
				form.value.username,
				form.value.phone,
				form.value.email,
				form.value.password
			)
			Swal.fire({
				icon: 'success',
				title: 'ລົງທະບຽນລະບົບສຳເລັດ',
				text: 'ກະລຸນາເຂົ້າສູ່ລະບົບ',
				showConfirmButton: true,
			})
			form.resetForm();
		}
	}

	ngOnInit(): void {
		
	}

}
