import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Users } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  Users: Users = {

    id: '',
    name: '',
    email: '',
    status: '',
    password: ''
  }


  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router) {
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      uname: ['',Validators.required],
      upassword: ['',Validators.required],

    })

    this.Users.name = this.loginForm.value.uname;
    this.Users.password = this.loginForm.value.upassword;

    
  }
result: any = false

  proceedlogin(): void {

     if (this.loginForm.valid) {
  this.service.authenticate(this.loginForm.value.uname, this.loginForm.value.upassword)}
else{
  alert("Required")
}

  
  }


}
