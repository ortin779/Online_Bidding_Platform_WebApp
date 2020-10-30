import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersBaseUrl = 'http://localhost:8080/order'
  constructor(private http:HttpClient) { }

  addOrderDetails(order){
    return this.http.post(this.ordersBaseUrl+"/add",order)
  }

  getPlacedOrders(customer_id){
    return this.http.get<any[]>(this.ordersBaseUrl+"/placed/"+customer_id)
  }

  getReceivedOrders(seller_id){
    return this.http.get<any>(this.ordersBaseUrl+"/received/"+seller_id)
  }

  getOrders(sortType,customer_id){
    return this.http.get<any>(this.ordersBaseUrl+"/placed/"+sortType+"/"+customer_id)
  }

}
