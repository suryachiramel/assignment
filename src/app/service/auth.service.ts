import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface Users {
  id: string;
  name: string;
  email: string;
  status: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  Users: Users = {

    id: '',
    name: '',
    email: '',
    status: '',
    password: ''
  }


  constructor(private http: HttpClient, private router: Router) { }
  apiurl = 'http://localhost:3000/users';

 
  authenticate(userName: string, password: string) {

    const value = this.http.get<any>(this.apiurl).subscribe(res => {
      const user = res.find((a: any) => { return a.name === userName && a.password === password })
      
      if (user) {
        alert("Login success!!!");
        this.router.navigate(['home']);
  
      } else {
        alert("Invalid credentials!!!");
        this.router.navigate(['']);
 
      }
    });
    
  }

  getUsers(): Observable<any> {
    return this.http.get<Users>(this.apiurl);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(this.apiurl + '/' + id);
  }
  saveUser(user: Users): Observable<any> {
    return this.http.post(this.apiurl + '/', user);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.apiurl + '/' + id);
  }
  editUser(id: string, user: Users): Observable<any> {
    return this.http.put(this.apiurl + '/' + id, user);
  }
}
