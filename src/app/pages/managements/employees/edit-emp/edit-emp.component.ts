import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from '../employees.service';
import { PositionService } from '../../positions/emp-position.service';
import Swal from 'sweetalert2';
import { Employee } from '../employee.model';
@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  
  updateEmpForm:FormGroup;
  positionList:any = [];
  getId:any;
  imagePrev:string;
  // employees:Employee;

  

  constructor(
    private empService:EmpService,
    private posiService:PositionService,
    private router:Router,
    private ngZone:NgZone,
    private activeRoute:ActivatedRoute
  ) {
    /*this.activeRoute.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('id')){
        this.getId = paramMap.get('id');
        this.empService.getEmp(this.getId).subscribe(formData => {
          this.employees = {
            _id: formData._id,
            emp_id: formData.emp_id,
            name: formData.name,
            surname: formData.surname,
            gender: formData.gender,
            dob: formData.dob,
            phone: formData.phone,
            email: formData.email,
            province: formData.province,
            district: formData.district,
            village: formData.village,
            position: formData.position,
            image: formData.image
          };
          this.updateEmpForm.setValue({
            emp_id: this.employees.emp_id,
            name: this.employees.name,
            surname: this.employees.surname,
            gender: this.employees.gender,
            dob: this.employees.dob,
            phone: this.employees.phone,
            email: this.employees.email,
            province: this.employees.province,
            district: this.employees.district,
            village: this.employees.village,
            position: this.employees.position,
            image: this.employees.image
          });
        })
      } else {
        this.getId = null;
      }
    })*/
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.empService.getEmp(this.getId).subscribe((res) => {
      let dateOB = new Date(res.dob);
      const format = 'yyyy-MM-dd';
      const locale = 'en_US';
      const formattedDate = formatDate(dateOB,format,locale);
      
      this.updateEmpForm.setValue({
        emp_id:res['emp_id'],
        name:res['name'],
        surname:res['surname'],
        gender:res['gender'],
        dob:formattedDate,
        phone:res['phone'],
        email:res['email'],
        province:res['province'],
        district:res['district'],
        village:res['village'],
        position:res['position'],
        image:res['image']
      })
    })
    this.updateEmpForm = new FormGroup({
      emp_id:new FormControl(null),
      name:new FormControl(null,Validators.required),
      surname:new FormControl(null,Validators.required),
      gender:new FormControl(null,Validators.required),
      dob:new FormControl(null,Validators.required),
      phone:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      province:new FormControl(null,Validators.required),
      district:new FormControl(null,Validators.required),
      village:new FormControl(null,Validators.required),
      position:new FormControl(null,Validators.required),
      image:new FormControl(null)
    })
  }

  ngOnInit(): void {
    this.posiService.getPositions().subscribe((res) => {
      this.positionList = res;
    });
  }

  onImagePicked(e:Event){
    const file = (e.target as HTMLInputElement).files[0];
    this.updateEmpForm.patchValue({image:file});
    this.updateEmpForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePrev = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpdate(){
    this.empService.updateEmp(
      this.getId,
      this.updateEmpForm.value.emp_id,
      this.updateEmpForm.value.name,
      this.updateEmpForm.value.surname,
      this.updateEmpForm.value.gender,
      this.updateEmpForm.value.dob,
      this.updateEmpForm.value.phone,
      this.updateEmpForm.value.email,
      this.updateEmpForm.value.province,
      this.updateEmpForm.value.district,
      this.updateEmpForm.value.village,
      this.updateEmpForm.value.position,
      this.updateEmpForm.value.image
    )
  }

}
