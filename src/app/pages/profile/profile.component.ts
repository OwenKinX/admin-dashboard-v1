import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentAdmin: Object = {};
  constructor(
    public authService:AuthService,
    private actRoute:ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this
  }

}
