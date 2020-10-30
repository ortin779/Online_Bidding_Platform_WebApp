import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http:HttpClient){

  }
  productsBaseUrl = "http://localhost:8080/product"

  addProduct(product){
    return this.http.post(this.productsBaseUrl+"/add",product)
  }

  getProducts(username){
    return this.http.get<any>(this.productsBaseUrl+"/all/"+username)
  }

  getUserProducts(username){
    return this.http.get<any>(this.productsBaseUrl+"/my/"+username)
  }

  getProductByProductId(id){
    return this.http.get<any>(this.productsBaseUrl+"/product/"+id)
  }

}
