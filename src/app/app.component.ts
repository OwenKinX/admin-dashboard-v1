import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChildrenOutletContexts } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
})
export class AppComponent implements OnInit {
  title = 'ss-admin';

  userIsAuthenticated = false
  private authListenerSubs:Subscription;

  constructor(
    private authService:AuthService,
    private spinner: NgxSpinnerService,
    private contexts: ChildrenOutletContexts
  ) {}

  prepareRoute(outlet:RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit():void {
    this.authService.autoAuthUser();
    // this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1500);
  }
}
