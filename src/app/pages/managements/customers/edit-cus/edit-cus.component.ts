import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cus',
  templateUrl: './edit-cus.component.html',
  styleUrls: ['./edit-cus.component.css']
})
export class EditCusComponent implements OnInit {

  getId:any;
  updateUserForm:FormGroup;

  constructor(
    private customerService:CustomersService,
    private router:Router,
    private ngZone:NgZone,
    private activeRoute:ActivatedRoute
  ) {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.customerService.getUser(this.getId).subscribe((res) => {
      let dateOB = new Date(res.dob);
      const format = 'yyyy-MM-dd';
      const locale = 'en_US';
      const formattedDate = formatDate(dateOB,format,locale);

      this.updateUserForm.setValue({
        cus_id: res['cus_id'],
        name: res['name'],
        surname: res['surname'],
        phone: res['phone'],
        email: res['email'],
        password: res['password'],
        dob: formattedDate,
        gender: res['gender'],
        province: res['province'],
        district: res['district'],
        village: res['village']
      })
    })
    this.updateUserForm = new FormGroup({
      cus_id: new FormControl(''),
      name: new FormControl('',Validators.required),
      surname: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      dob: new FormControl('',Validators.required),
      gender: new FormControl('',Validators.required),
      province: new FormControl('',Validators.required),
      district: new FormControl('',Validators.required),
      village: new FormControl('',Validators.required)
    })
  }

  ngOnInit(): void {
  }
  onUpdate():any{
    this.customerService.updateUser(this.getId, this.updateUserForm.value).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
        showConfirmButton: false,
        timer: 1500
      })
      this.ngZone.run(() => this.router.navigateByUrl('/list-cus'))
    },(err) => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(err);
    })
  }
}
