import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false
  user:any;
  constructor(
    private commonService: CommonService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.commonService.isUserLogin.subscribe(val =>{
      if(val){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    })
    this.getUser();
  }

  logOut(){
    this.router.navigate(['/login'])
    localStorage.removeItem('credentials')
    this.loggedIn = false;
  }

  getUser(){
    this.commonService.me().subscribe((val:any) =>{
      if(val && val._id){
        this.user = val
      }
    }, err =>console.log(err))
  }

}
