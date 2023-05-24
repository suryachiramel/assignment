import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Users } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']


})
export class UserdetailsComponent implements OnInit {

  id1: any
  id2: any
  addForm: any
  Users: Users = {
    id: '',
    name: '',
    email: '',
    status: '',
    password: ''
  }
  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router,
    private Acti: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    this.id1 = this.Acti.snapshot.params[('id')]

    if (this.id1) {
      this.service.getUserById(this.id1).subscribe((res: Users) => {
        this.Users = res;
        console.log(this.Users);
      })
      this.addForm = this.formBuilder.group({
        uid: this.Users.id,
        uname: this.Users.name,
        uemail: this.Users.email,
        ustatus: this.Users.status,
        upassword: this.Users.password
      })
    } else {

      console.log(this.id1);
      this.addForm = this.formBuilder.group({
        uid: [''],
        uname: [''],
        uemail: [''],
        ustatus: [''],
        upassword: ['']
      })



     


      console.log(this.addForm.value.uid);
     
      console.log(this.Users.id);



    }

  }
  cancelsave() {
    this.router.navigate(['userdetails']);
    
  }
  detailsadd() {
    this.Users.id = this.addForm.value.uid;
    this.Users.name = this.addForm.value.uname;
    this.Users.email = this.addForm.value.uemail;
    this.Users.status = this.addForm.value.ustatus;
    this.Users.password = this.addForm.value.upassword
    console.log(this.addForm.value.uid);

    console.log(this.Users.id);
    if (this.id1) {

      this.service.editUser(this.id1,this.Users).subscribe((res: Users) => {
        alert("success")
        this.router.navigate(['userlist']);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      this.service.saveUser(this.Users).subscribe((res: Users) => {
        alert("success")
        this.router.navigate(['userlist']);
      }, (err) => {
        console.log(err);
      });
    }
  }
}
