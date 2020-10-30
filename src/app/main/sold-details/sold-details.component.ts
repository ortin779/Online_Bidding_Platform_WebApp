import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sold-details',
  templateUrl: './sold-details.component.html',
  styleUrls: ['./sold-details.component.css']
})
export class SoldDetailsComponent implements OnInit {
  orders: any
  totalMoney = 0
  isEmpty
  userId
  searchText = ""
  constructor(private http: HttpClient, private ordersService: OrdersService, private userService: UserService,private _router:Router) { }

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
      }
    });
    this.fetchData()
  }

  fetchData() {
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.ordersService.getReceivedOrders(data).subscribe(
          data => {
            this.orders = data
            this.isEmpty = this.orders.length === 0
            for (const iterator of this.orders) {
              this.totalMoney += iterator['price']
              let customerId = iterator['customerId']
              this.userService.getUserNameById(customerId).subscribe(
                data => {
                  iterator['customerName'] = data
                }
              )
            }
          }
        )
      }
    )
  }
}
