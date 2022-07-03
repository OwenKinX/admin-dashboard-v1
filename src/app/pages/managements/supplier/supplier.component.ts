import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { SupplierService } from './supplier.service';
import { LaosAreasService } from 'src/app/services/laos-areas.service';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2'
import { Supplier } from './supplier.model';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {

  isSwap:boolean = false;
  dtOptions:DataTables.Settings = {};

  provinceList:any = [];
  districtList:any = [];
  villageList:any = [];

  province_data:any = [];
  district_data:any = [];
  village_data:any = [];

  genSupId:any = "SUP-100";

  constructor(
    public supplierService:SupplierService,
    public laosAreasService:LaosAreasService,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // get provinces by access to services
    this.laosAreasService.getProvinces().subscribe((res) => {
      this.provinceList = res.provinces;
    });

    // get districts by access to services
    this.laosAreasService.getDistricts().subscribe((res) => {
      this.districtList = res.districts;
    });

    //get villages by access to services
    this.laosAreasService.getVillages().subscribe((res) => {
      this.villageList =  res.villages;
    });

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }

    const possible = "0123456789";
    for(let i = 0; i < 6; i++)  {
      this.genSupId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.supplierService.selectedSupplier = {
      _id: "",
      sup_id: this.genSupId,
      name:"",
      phone: null,
      email:"",
      address: {
        province:"",
        district:"",
        village:"",
      }
    }
    this.refreshSupplierList();
  }

  onSelectProvince(province:any){
    let data = this.districtList.filter((res: {pr_id:string}) => {
      return res.pr_id.toLowerCase().match(province.target.value.toLocaleLowerCase());
    })
    this.district_data = data;
    this.village_data = null;
  }

  onSelectDistrict(district:any) {
    let data = this.villageList.filter((res:{dr_id:string}) => {
      return res.dr_id.toLowerCase().match(district.target.value.toLocaleLowerCase());
    })
    this.village_data = data;
  }

  onSubmit(form:NgForm) {
    if(form.value._id == ""){
      Swal.fire({
        title: 'ຕ້ອງການເພີ່ມຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.supplierService.addSupplier(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshSupplierList();
          })
          Swal.fire({
            icon: 'success',
            title: 'ເພີ່ມຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500	
          })
        }
      })
    } else {
      Swal.fire({
        title: 'ຕ້ອງການແກ້ໄຂຂໍ້ມູນແທ້ບໍ ?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then(result => {
        if(result.isConfirmed){
          this.supplierService.updateSupplier(form.value).subscribe((res) => {
            this.resetForm(form);
            this.refreshSupplierList();
          })
          Swal.fire({
            icon: 'success',
            title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
  }

  refreshSupplierList() {
    this.supplierService.getSuppliers().subscribe((res) => {
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        this.supplierService.suppliers = res as Supplier[];
      },500);
    })
    this.isSwap = false;
  }

  onEdit( supplier:Supplier ) {
    this.isSwap = true;
    this.supplierService.selectedSupplier = supplier;
  }

  onDelete(_id:string, form:NgForm) {
    Swal.fire({
      title: 'ຕ້ອງການລຶບຂໍ້ມູນແທ້ບໍ ?',
      text: "ຖ້າລຶບແລ້ວຈະບໍ່ສາມາດກູ້ຄືນໄດ້!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລຶບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(_id).subscribe((res) => {
          this.resetForm(form);
          this.refreshSupplierList();
        })
        Swal.fire(
          'ລຶບຂໍ້ມູນສຳເລັດ!',
          'ຂໍ້ມູນໄດ້ຖືກລຶບອອກຈາກລະບົບແລ້ວ',
          'success',
        )
      }
    })
  }
}
