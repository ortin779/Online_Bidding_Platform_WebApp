import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersBaseUrl = "http://localhost:8080/user"

  constructor(private http:HttpClient) { }
  
  getUserId(username){
    return this.http.get<any>(this.usersBaseUrl+"/"+username)
  }

  forgotPassword(username){
    return this.http.get<any>(this.usersBaseUrl+"/forgot/"+username)
  }

  getUserDetails(id){
    return this.http.get<any>(this.usersBaseUrl+"/details/"+id)
  }

  getUserNameById(id):Observable<string>{
    return this.http.get(this.usersBaseUrl+"/username/"+id,{responseType:'text'})
  }

}
