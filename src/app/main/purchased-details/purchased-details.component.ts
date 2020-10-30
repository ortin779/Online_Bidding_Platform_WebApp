import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Router, NavigationEnd } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-purchased-details',
  templateUrl: './purchased-details.component.html',
  styleUrls: ['./purchased-details.component.css']
})
export class PurchasedDetailsComponent implements OnInit, OnDestroy {

  isEmpty
  totalMoney
  orders
  customer_id
  searchText = ""
  constructor(private http: HttpClient, private ordersService: OrdersService, private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
      }
    });
    this.getAllOrders()
  }

  ngOnDestroy() {

  }

  getAllOrders() {
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.customer_id = data
        console.log("Customer ID :"+data)
        this.ordersService.getPlacedOrders(data).subscribe(
          data => {
            console.log(data)
            if (data.length === 0) {
              console.log("No orders There.")
              this.isEmpty = true
            } else {
              this.orders = data
              this.totalMoney = 0
              for (const iterator of this.orders) {
                this.isEmpty = false
                this.totalMoney += iterator['price']
                let sellerId = iterator['sellerId']
                this.userService.getUserNameById(sellerId).subscribe(
                  data => {
                    iterator['sellerName'] = data
                  }
                )
              }
              console.log(this.totalMoney)
            }
          }
        )
      }
    )
  }


  getSortedOrders(sortBy) {
    this.totalMoney = 0
    this.ordersService.getOrders(sortBy, this.customer_id).subscribe(
      data => {
        this.orders = data
        console.log(data)
        for (const iterator of this.orders) {
          this.totalMoney += iterator['price']
          let seller_id = iterator['sellerId']
          this.userService.getUserNameById(seller_id).subscribe(
            data => {
              iterator['sellerName'] = data
            }
          )
        }
      }
    )
  }

}
