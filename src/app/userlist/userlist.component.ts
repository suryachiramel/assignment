import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Users } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit {

  User:any;
  Users: Users = {
    id: '',
    name: '',
    email: '',
    status: '',
    password: ''
  }
  ngOnInit(): void {
    this.service.getUsers().subscribe((res: Users) => {
      this.User = res
      console.log(this.Users);
      
    }
    )
  }
  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router) {
  }
  proceededit(_id: string) {
     this.router.navigate(['/userdetails',_id]);
    
  }
  proceeddelete(_id: string) {
    console.log(_id)
    this.service.deleteUser(_id).subscribe((res: Users) => {
      alert("delete successful")
      this.router.navigate(['userlist']);
    })

  }
}
