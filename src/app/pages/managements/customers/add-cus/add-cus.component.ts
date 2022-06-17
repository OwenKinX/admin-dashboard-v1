import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-cus',
  templateUrl: './add-cus.component.html',
  styleUrls: ['./add-cus.component.css']
})
export class AddCusComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    village: new FormControl(''),
  })

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private customerService:CustomersService
  ) {
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required],
      password: ['12345678'],
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      province: ['',Validators.required],
      district: ['',Validators.required],
      village: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  sanitizeDate(date: string): string {
    if (!date) {
      return null;
    }
  
    const dataArray = date.split('-');
    const month = Number(dataArray[0]) - 1;
    const day = Number(dataArray[1]);
    const year = Number(dataArray[2]);
    return (new Date(year, month, day)).toISOString();
  }

  onSubmit():any{
    this.customerService.AddUser(this.userForm.value).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
        showConfirmButton: false,
        timer: 1500	
      })
      this.ngZone.run(() => this.router.navigateByUrl('/list-cus'))
    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        showConfirmButton: false,
        timer: 1500	
      })
      console.log(err);
    })
  }
}
