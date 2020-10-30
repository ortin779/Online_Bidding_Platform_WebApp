import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.css']
})
export class ProductslistComponent implements OnInit {
  products
  isEmpty
  showOverlay = true;
  alert = true
  currentUser = sessionStorage.getItem('authenticatedUser');
  searchText = ""

  constructor(private http:HttpClient,private userService:UserService,
    private router:Router,private productService:ProductsService) {
   }

  ngOnInit(): void {
    this.fetchData()
  }

  bidProduct(product){
    console.log("Hello")
    this.router.navigate(['app/bid',product.productId])
  }

  fetchData(){
    this.userService.getUserId(this.currentUser).subscribe(
      data => {
        console.log(data)
        this.productService.getProducts(data).subscribe(
          data =>{
            this.products = data
            this.isEmpty = this.products.length === 0
            for (let element of this.products){
              this.userService.getUserNameById(element['sellerId']).subscribe(
                data => {
                  element['sellerName'] = data
                }
              )
            }
          }
        )
      }
    )
  }

  closeAlert(){
    this.alert = false
  }
}
