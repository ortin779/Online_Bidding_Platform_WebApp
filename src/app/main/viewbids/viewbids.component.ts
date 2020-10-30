import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { BidsService } from 'src/app/services/bids.service';

@Component({
  selector: 'app-viewbids',
  templateUrl: './viewbids.component.html',
  styleUrls: ['./viewbids.component.css']
})
export class ViewbidsComponent implements OnInit {

  bids
  userId
  isEmpty = false
  imageUrl = ""
  constructor(private router: Router, private userService: UserService,private productService:ProductsService,
    private bidsService:BidsService) { }

  ngOnInit(): void {
    this.fetchData()
  }

  purchaseProduct(id) {
    this.router.navigate(['/app/payment/bid/', id])
  }

  fetchData() {
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.userId = data
        this.bidsService.getBidsPlaced(this.userId).subscribe(
          data => {
            this.bids = data
            console.log(this.bids)
            this.isEmpty = this.bids.length === 0
            for (let bid of this.bids) {
              console.log(bid)
              this.productService.getProductByProductId(bid['productId']).subscribe(
                data => {
                  bid['product'] = data
                  this.imageUrl = bid['product'].image
                  this.userService.getUserNameById(bid['product']['sellerId']).subscribe(
                    data => {
                      bid['sellerName'] = data
                    }
                  )
                }
              )
            }
          }
        )
      }
    )
  }
}
