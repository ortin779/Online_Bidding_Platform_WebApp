import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  alert:boolean = false
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  forgotPassword(value){
    console.log(value)
    this.userService.forgotPassword(value['username']).subscribe(
      data => {
        console.log(data)
        this.alert = true
      }
    )
  }

  closeAlert(){
    this.alert = false
    this.router.navigate(['/home/login'])
  }

}
