import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  bidsBaseUrl = "http://localhost:8080/bid"

  constructor(private http:HttpClient) { }

  addBidForProduct(bid){
    const body = JSON.stringify(bid)
    console.log(bid)
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post(this.bidsBaseUrl+"/add",bid,{headers:headers})
  }

  getBidsReceivedForProduct(uid){
    return this.http.get<any>(this.bidsBaseUrl+"/received/"+uid)
  }

  getBidsPlaced(cid){
    return this.http.get<any>(this.bidsBaseUrl+"/placed/"+cid)
  }

  acceptBid(bid_id){
    return this.http.post(this.bidsBaseUrl+"/accept/"+bid_id,[])
  }

  getBidByBidId(bid_id){
    return this.http.get<any>(this.bidsBaseUrl+"/get/"+bid_id)
  }
}
