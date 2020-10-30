import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BidsService } from 'src/app/services/bids.service';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-myauctions',
  templateUrl: './myauctions.component.html',
  styleUrls: ['./myauctions.component.css']
})
export class MyauctionsComponent implements OnInit {

  myProducts:any
  empty
  isAccepted = false;
  constructor(private productsService:ProductsService,private bidsService:BidsService,private _router:Router,private userService:UserService) { }

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

  acceptBid(bid){
    this.bidsService.acceptBid(bid).subscribe(
      data => {
        this.isAccepted = true
      }
    )
  }

  fetchData(){
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.productsService.getUserProducts(data).subscribe(
          data =>{
            this.myProducts = data
            for (let index = 0; index < this.myProducts.length; index++) {
              const element = this.myProducts[index];
              this.bidsService.getBidsReceivedForProduct(element.productId).subscribe(
                data => {
                  element.bids = data
                  for (let i = 0; i < element.bids.length; i++) {
                    const bid = element.bids[i];
                    console.log(bid)
                    this.userService.getUserNameById(bid['customerId']).subscribe(
                      data => {
                        console.log(data)
                        bid['biddername'] = data
                      }
                    )
                  }
                }
              )
            }
            this.empty = this.myProducts.length === 0;
          }
        );
      }
    )
  }

  closeAlert(){
    this.isAccepted = false
    this.ngOnInit()
  }
}
