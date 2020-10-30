import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationCancel, Router } from '@angular/router';
import { CardDetailsService } from 'src/app/services/card-details.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { BidsService } from 'src/app/services/bids.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
  year = this.generateYear()
  bid
  bidId
  orderDetails={}
  cardDetails
  savedCards
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,private builder:FormBuilder,private cardService:CardDetailsService,
    private ordersService:OrdersService,private userService:UserService,
    private productService:ProductsService,private bidsService:BidsService) { }

  ngOnInit(): void {
    this.fetchData()
    this.cardDetails = this.builder.group({
      cardHolder : ['',[Validators.required]],
      cardNumber : ['',[Validators.required]],
      month : ['',[Validators.required]],
      year : ['',[Validators.required]],
      cvv : ['',[Validators.required]],
      save : [''],
      customerId:['']
      }
    )
  }

  placeOrder(bid){
    if(this.cardDetails.get('save').value){
      this.cardDetails.patchValue({month:parseInt(this.cardDetails.get('month').value)})
      this.cardDetails.patchValue({year:parseInt(this.cardDetails.get('year').value)})
      this.cardDetails.patchValue({customerId:bid.customerId})
      this.cardService.saveCardDetails(this.cardDetails.value).subscribe(
        data => {
          console.log(data)
        }
      )
    }
    this.orderDetails['orderDate'] = Date.now()
    this.orderDetails['price'] = this.bid.bidValue
    this.orderDetails['customerId'] = this.bid.customerId
    this.createOrderDetails(bid.product)
    console.log(this.orderDetails)
    this.ordersService.addOrderDetails(this.orderDetails).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['app/payment-success'])
      }
    )
  }

  generateYear(){
    let i=2021
    let l = []
    while(i<2040){
      l.push(i)
      i++
    }
    return l
  }

  createOrderDetails(product){
    this.orderDetails['productId'] = product.productId
    this.orderDetails['productName'] = product.productName
    this.orderDetails['category'] = product.category
    this.orderDetails['productImage'] = product.image
    this.orderDetails['sellerId'] = product.sellerId
  }

  setCardDetails(card){
    this.cardDetails.patchValue(card)
  }

  fetchData(){
    this.bidId = (this.activatedRoute.snapshot.paramMap.get('id'))
    this.bidsService.getBidByBidId(this.bidId).subscribe(
      data => {
        this.bid = data
        this.productService.getProductByProductId(this.bid['productId']).subscribe(
          data => {
            this.bid['product'] = data
          }
        )
      }
    )
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        this.cardService.getCardDetailsByCustomer(data).subscribe(
          data => {
            console.log(data)
            this.savedCards = data
          }
        )
      }
    )
  }
}
