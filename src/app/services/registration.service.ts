import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  registerUser(user){
    const body = JSON.stringify(user)
    console.log(user)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post('http://localhost:8080/user/register',body,{headers:headers})
  }
}
