import { Component, OnInit } from '@angular/core';
import { ImportsService } from '../imports.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.css']
})
export class ImportDetailComponent implements OnInit {

  importDetaiList:any = [];
  getImpNo:any;

  dtOptions:DataTables.Settings = {};
  constructor( private importService:ImportsService, private activeRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getImpNo = this.activeRoute.snapshot.paramMap.get('imp_no');
    this.importService.getImportDetail(this.getImpNo).subscribe( detail => {
      this.importDetaiList = detail;
    });

    this.dtOptions = {
      pageLength: 5,
      lengthMenu: [5, 10, 20, 50, 100]
    }
  }

}
