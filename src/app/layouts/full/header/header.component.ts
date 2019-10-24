import { Component } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService } from '../../../core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
    constructor( private auth : AuthService){

    }
    public config: PerfectScrollbarConfigInterface = {};
    
    logout(){
      console.log("logging out")
      this.auth.logout()
      this.auth.isLoggedIn()
    }
  }
