import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';
import { Categories } from '../Categories';
@Component({
  selector: 'app-sellproduct',
  templateUrl: './sellproduct.component.html',
  styleUrls: ['./sellproduct.component.css']
})
export class SellproductComponent implements OnInit {

  auctProduct:any
  imageFile : File
  imageUrl
  fileName
  userId
  sellerForm:FormGroup;
  categories : any[]
  constructor(private builder:FormBuilder,private userService:UserService,private productService:ProductsService,
    private router:Router) {
   }

   ngOnInit(): void {
    this.sellerForm = this.builder.group({
        productName : ['',[Validators.required]],
        description: ['',[Validators.required]],
        category : ['', [Validators.required]],
        initialBid : ['',[Validators.required]],
        sellerId :[''],
        file : ['',[Validators.required]],
        image: new FormControl()
      }
    )
    this.categories = new Categories().getList()
    this.userService.getUserId(sessionStorage.getItem('authenticatedUser')).subscribe(
      data =>{
        this.sellerForm.patchValue({sellerId:data})
      }
    )
  }

  auctionProduct(){
    this.sellerForm.patchValue({image:this.imageUrl})
    this.auctProduct = this.sellerForm.value
    console.log(this.auctProduct)
    this.productService.addProduct(this.auctProduct).subscribe(
      data =>{
        if(data!=0){
          console.log("Product Added successfully")
          this.router.navigate(['app/myauctions'])
        }else{
          console.log("Error While Adding the Product")
        }
      }
    )
  }

  onSelectedFile(event){
    this.imageFile = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
  }
}
