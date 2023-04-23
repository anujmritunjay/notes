import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()

  }

  createForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  submitLogin(){
    const payload = this.loginForm.value
    this.commonService.logIn(payload).subscribe(val =>{
      if(val && val.user){
        this.router.navigate(['/notes'], {replaceUrl: true})
      }
    }, err =>{
      console.log(err)
    })
  }

  getControl(name: any) : AbstractControl | null {
    return this.loginForm.get(name)
  }

}
