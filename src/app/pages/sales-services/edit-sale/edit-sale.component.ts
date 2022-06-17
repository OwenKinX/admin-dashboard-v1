import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from '../../managements/employees/employees.service';
import { CustomersService } from '../../managements/customers/customers.service';
import { SalesService } from '../sales.service';
import { formatDate } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css']
})
export class EditSaleComponent implements OnInit {

  updateSaleForm:FormGroup;
  empList:any = [];
  userList:any = [];
  getId:any;

  constructor(
    private empService:EmpService,
    private userService:CustomersService,
    private saleService:SalesService,
    private activeRoute:ActivatedRoute,
    private router:Router,
    private ngZone:NgZone
  ) {
    this.getId = this.activeRoute.snapshot.paramMap.get('id');
    this.saleService.getSale(this.getId).subscribe((res) => {
      let dateOB = new Date(res.date);
      const format = 'yyyy-MM-dd';
      const locale = 'en_US';
      const formattedDate = formatDate(dateOB,format,locale);
      this.updateSaleForm.setValue({
        invoice_no:res['invoice_no'],
        sale_type:res['sale_type'],
        cash:res['cash'],
        date:formattedDate,
        delivery:res['delivery'],
        place_deli:res['place_deli'],
        deliver_cost:res['deliver_cost'],
        customer:res['customer'],
        employee:res['employee']
      })
    })
    this.updateSaleForm = new FormGroup({
      inv_no:new FormControl(null,{validators:[Validators.required]}),
      sale_type:new FormControl(null,{validators:[Validators.required]}),
      cash:new FormControl(null,{validators:[Validators.required]}),
      date:new FormControl(null,{validators:[Validators.required]}),
      delivery:new FormControl(null),
      place_deli:new FormControl(null),
      deliver_cost:new FormControl(null),
      customer:new FormControl(null,{validators:[Validators.required]}),
      employee:new FormControl(null,{validators:[Validators.required]})
    })
  }

  ngOnInit(): void {
     // get all emp
     this.empService.getEmps().subscribe((res) => {
      this.empList = res;
    })

    // get all
    this.userService.getUsers().subscribe((res) => {
      this.userList = res;
    })
  }

  onUpdate(){
    Swal.fire({
      icon: 'question',
      title: 'ຕ້ອງແກ້ຂໍ້ມູນແທ້ບໍ ?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then(result => {
      if(result.isConfirmed){
        this.saleService.updateSales(
          this.getId,
          this.updateSaleForm.value
        ).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
            showConfirmButton: true,	
          })
          this.ngZone.run(() => this.router.navigateByUrl('/sale-manage'))
        });
      }
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນ',
        text: err,
        showConfirmButton: true
      })
    })
  }
}
