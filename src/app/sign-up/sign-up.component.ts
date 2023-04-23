import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  singUpForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.singUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  singUpSubmit(){
    const payload = this.singUpForm.value
    this.commonService.signUp(payload).subscribe(val=>{
      console.log('val: ', val);
      if(val && val.user){
        this.router.navigate(['/notes'], {replaceUrl: true})
      }
    })

  }

  getControl(name: any) : AbstractControl | null{
    return this.singUpForm.get(name)
  }

}
