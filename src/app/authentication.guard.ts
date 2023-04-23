import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private commonService: CommonService
  ){}
  canActivate(): boolean{
    if(this.commonService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }

}
