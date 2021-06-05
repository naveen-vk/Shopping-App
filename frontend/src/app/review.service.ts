import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _http:HttpClient) { }

  getReview(isbn:any){
    return this._http.get('http://localhost:3000/api/myreview/'+isbn)
  }

  userReview(isbn:any,email:any,username:any,review:any,rating:any){
    const body={email,username,review,rating,isbn}
    return this._http.post(`http://localhost:3000/api/reviews`,body)
  }
}
