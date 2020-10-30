import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { BidsService } from 'src/app/services/bids.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  bidForm: FormGroup
  product
  productId
  constructor(private route:ActivatedRoute,private http:HttpClient,private productsService:ProductsService,
    private router:Router,private builder:FormBuilder,private bidsService:BidsService,private userService:UserService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')
    this.bidForm = this.builder.group({
      productId :[this.productId],
      customerId: [''],
      bidValue: ['',[Validators.required]],
      bidStatus:[0]
    }
    )
    if(this.productId != null){
      this.product = this.productsService.getProductByProductId(this.productId).subscribe(
        data => {
          if(data == null){
            this.router.navigate(['/app/products'])
          }
          this.product = data
          this.userService.getUserNameById(this.product.sellerId).subscribe(
            data => {
              console.log(data)
              this.product['sellerName'] = data
            }
          )
        }
      )
    }
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data => {
        let id = data
        this.bidForm.patchValue({customerId:id})
      }
    )
  }

  isInvalidBid(){
     return this.product.initialBid > this.bidForm.get('bidValue').value
  }
  
  bidForProduct(){
    const bidDetails = this.bidForm.value
    this.bidsService.addBidForProduct(bidDetails).subscribe(
      data => {
        this.router.navigate(['app/mybids'])
      }
    )
  }

}
