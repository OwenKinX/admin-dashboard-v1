import { Component, OnInit, NgZone } from '@angular/core';
import { EmpService } from '../employees.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PositionService } from '../../positions/emp-position.service';
import { LaosAreasService } from 'src/app/services/laos-areas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  empForm:FormGroup;
  imagePrev:string;

  positionList:any = [];
  provinceList:any = [];

  genEmpId:any = "EMP-200";

  constructor(
    private router:Router,
    private ngZone:NgZone,
    private empService:EmpService,
    private posiService:PositionService,
    private laoService:LaosAreasService
  ) {}

  ngOnInit(): void {
  
    // get position
    this.posiService.getPositions().subscribe((res) => {
      this.positionList = res;
    })

    this.laoService.getProvinces().subscribe(res => {
      this.provinceList = res.provinces;
    })

    this.empForm = new FormGroup({
      emp_id:new FormControl(null,{validators: [Validators.required]}),
      name:new FormControl(null,{validators: [Validators.required]}),
      surname:new FormControl(null,{validators: [Validators.required]}),
      gender:new FormControl(null,{validators: [Validators.required]}),
      dob:new FormControl(null,{validators: [Validators.required]}),
      phone:new FormControl(null,{validators: [Validators.required]}),
      email:new FormControl(null,{validators: [Validators.required]}),
      province:new FormControl(null,{validators: [Validators.required]}),
      district:new FormControl(null,{validators: [Validators.required]}),
      village:new FormControl(null,{validators: [Validators.required]}),
      position:new FormControl(null,{validators: [Validators.required]}),
      image:new FormControl(null)
    })

    const possible = "0123456789";
    for(let i = 0; i < 6; i++){
      this.genEmpId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  onImagePicked(e:Event){
    const file = (e.target as HTMLInputElement).files[0];
    this.empForm.patchValue({image:file});
    this.empForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit():any{
    this.empService.AddEmp(
        this.empForm.value.emp_id,
        this.empForm.value.name,
        this.empForm.value.surname,
        this.empForm.value.gender,
        this.empForm.value.dob,
        this.empForm.value.phone,
        this.empForm.value.email,
        this.empForm.value.province,
        this.empForm.value.district,
        this.empForm.value.village,
        this.empForm.value.position,
        this.empForm.value.image
    ).subscribe((res) => {
      Swal.fire({
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500	
          })
          this.empForm.reset();
          this.ngZone.run(() => this.router.navigate(['/list-employees']))
        }
      }).catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
          text: err,
          showConfirmButton: false,
          timer: 1500	
        })
      })
    });
  }
}
