import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';

  constructor(
    private router: Router,
    private commonService: CommonService
  ){
    if(this.commonService.isLoggedIn()){
      this.router.navigate(['/notes'])
    }else{
      this.router.navigate(['/login'])
    }
  }
}
