import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/wishlist.service';



@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist:number[]=[];
  @Input() products:any[]=[];
  addedtocart:boolean=false;

  constructor(private _http:HttpClient,
              private wishlistService:WishlistService,
              private router:Router) { }

  ngOnInit(): void {
    this.loadwishlist();
  }
  loadwishlist(){
    this.wishlistService.getWishlist().subscribe(productIds => {
      this.wishlist=productIds;
      this.wishlist.map(item=>{
        this._http.get('http://127.0.0.1:3000/api/'+item).subscribe((res:any)=>{
        this.products.push(res);
      })
     
      })
    })
  }

  /*addtocart(product:any){
    this.addedtocart=true;
  }*/

  gotocart(){
    this.router.navigate(['/cart']);
  }

  viewdetails(isbn:number){
    this.router.navigate([`/products/${isbn}`]);
  }

  deleteitem(isbn:number){
    this.wishlistService.removefromWishlist(isbn).subscribe(()=>{
      window.location.reload();
    });
  }

}
