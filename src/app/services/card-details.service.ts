import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  cardDetailsBaseUrl = "http://localhost:8080/cards"

  constructor(private http:HttpClient) { }

  saveCardDetails(cardDetails){
    console.log(cardDetails)
    return this.http.post(this.cardDetailsBaseUrl+"/add",cardDetails)
  }

  getCardDetailsByCustomer(customerId){
    return this.http.get<any>(this.cardDetailsBaseUrl+"/get/"+customerId)
  }
}
