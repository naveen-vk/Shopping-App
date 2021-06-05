import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { OrderService } from 'src/app/order.service';
import { ReviewService } from 'src/app/review.service';
import { UserService } from 'src/app/user.service';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() product:any;
  Url:any;
  addedtowishlist: boolean=false;
  addedtocart:boolean=false;
  userIsAuthenticated:boolean=false;
  authListnerSubs: any=null;
  userID:any="";
  reviews:any;
  reviewForm = new FormGroup({
    username: new FormControl(''),
    email:  new FormControl(''),
    review: new FormControl(''),
    rating: new FormControl('')
  })
  
  constructor(private router:Router,
              private route:ActivatedRoute,
              private _http:HttpClient,
              private wishtlistservice:WishlistService,
              private user:UserService,
              private order:CartService,
              private reviewService:ReviewService) { }

 
  ngOnInit(): void {
    this.getproduct();
    this.userIsAuthenticated=Boolean(this.user.getIsAuth());
    this.userID=this.user.getUserMail();
    this.checkwl();
    this.checkcart();
    this.getreview();
    console.log(this.addedtowishlist);
  }
   
  getproduct(){
    var isbn=this.route.snapshot.paramMap.get("isbn")
    this._http.get('http://127.0.0.1:3000/api/'+isbn).subscribe((res:any)=>{
      return this.product=res;
    })
    this.Url=this.route.url; 
    }
  
  addtowishlist(){
    this.wishtlistservice.addToWishlist(this.product.isbn).subscribe(()=>{
      this.addedtowishlist=true;
    });
  }

  removefromwishlist(){
    this.wishtlistservice.removefromWishlist(this.product.isbn).subscribe(()=>{
      this.addedtowishlist=false;
    });
  }

  addtocart(){
    this.user.getIsAuth();
    this.order.addtocart(this.product).subscribe(()=>{
      this.addedtocart=true;
    })
  }

  gotocart(){
    this.authListnerSubs=this.user.getAuthStatusListner()
    .subscribe(isAuthenticated=>{
    this.userIsAuthenticated=isAuthenticated;
    console.log("user:"+isAuthenticated);
});
    this.router.navigate(['/cart']);
  }


  alertmsg(){
    alert("please login to proceed")
  }

  checkwl(){
    this.wishtlistservice.getWishlist().subscribe(productids=>{
        let i=productids.length
        while(i>=0){
        if(this.product.isbn===String(productids[i])){
          this.addedtowishlist=true;
        }
        i--;
      }
      console.log(this.addedtowishlist,productids,this.product.isbn)
    })
  }

  checkcart(){
    this.order.getcart().subscribe(names=>{
      let i=names.length
      while(i>=0){
      if(this.product.title===String(names[i])){
        this.addedtocart=true;
      }
      i--;
    }
    console.log(this.addedtocart,names,this.product.title)
  })
}


getreview(){
  this.reviewService.getReview(this.route.snapshot.paramMap.get("isbn")).subscribe((res)=>{
    this.reviews=res;
  })
  console.log(this.reviews)
}

addreview(){
  console.log(this.product.isbn)
  this.reviewService.userReview(this.route.snapshot.paramMap.get("isbn"),this.email.value,this.username.value,this.review.value,this.rating.value).subscribe((result)=>{
    console.log(result,"review added successfully")
  })
  window.location.reload();
}

get email(): AbstractControl{
  return this.reviewForm.controls['email'];
}
get username(): AbstractControl{
  return this.reviewForm.controls['username'];
}
get review(): AbstractControl{
  return this.reviewForm.controls['review'];
}
get rating(): AbstractControl{
  return this.reviewForm.controls['rating'];
}

}