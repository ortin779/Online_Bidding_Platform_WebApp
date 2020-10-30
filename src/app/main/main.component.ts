import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  username = sessionStorage.getItem('authenticatedUser')
  constructor(private authenticator:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authenticator.logout()
  }
}
