import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService implements OnInit {

  usermail:any=""

  constructor(private _http:HttpClient,
              private user:UserService
              ) { }
  
ngOnInit(){}
 
  getWishlist() {
    var mail = this.user.getUserMail();
    return this._http.get('http://localhost:3000/api/mywl/'+mail).pipe(
      map((result:any) => {
        let productIds: any[] = []
        result.forEach((item: { isbn: any; }) => productIds.push(item.isbn))
        return productIds;
      })
    )
  }

  addToWishlist(productisbn: any){
    this.usermail=this.user.getUserMail()
    const body={isbn:productisbn,email:this.usermail}
    return this._http.post('http://127.0.0.1:3000/api/wishlist',body,{
      observe:"body",
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  removefromWishlist(productisbn: any){
    return this._http.delete('http://127.0.0.1:3000/api/wishlist'+'/'+productisbn) 
  }
}
