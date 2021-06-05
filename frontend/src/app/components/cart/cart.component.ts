import { subscribeOn } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { Item } from 'src/app/model';
import { OrderService } from 'src/app/order.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 title:any=[];
 isbn:any=[];
 quantity:any=[];
  items : Item[]=[] ;
  Address:any=''
  tp=0;
  dp=0;
  private itemSubscribe: Subscription = new Subscription;
  

  constructor(public cartService : CartService,private orderservice:OrderService,private userservice:UserService,private router:Router) { }

  ngOnInit(): void {
    this.cartService.getItems();
    this.itemSubscribe = this.cartService.getUpdateListner().subscribe((items : Item[]) => {
      this.items = items;
    });

  
  }

  onRemove(itemId: any){
    this.cartService.deleteItem(itemId);
  }

soon()
{
  alert("No coupon available")
}
inc(id: any,quantity: any)
{
  for(let i=0;i<this.items.length;i++)
  {
if(this.items[i].id===id)
{
  this.items[i].quantity=parseInt(quantity)+1;
}

  }

}
dec(id:any,quantity:any)
{
  for(let i=0;i<this.items.length;i++)
  {
if(this.items[i].id===id)
{
  if(quantity!=1)
  {
  this.items[i].quantity=parseInt(quantity)-1;
}
  }
}
  
}

total()
{
this.tp=0;
  for(let i=0;i<this.items.length;i++)
    {
 this.tp+=this.items[i].price*this.items[i].quantity;
    }

    return this.tp;

}

discount()
{
  this.dp=0;
for(let i=0;i<this.items.length;i++)
{
   this.dp+=(this.items[i].price*this.items[i].discount)/100;
}
return this.dp;
}
 check(){
   
  
   for(var i of this.items){
     console.log("---------")
     console.log(i);
     
   }
 }

product(isbn:any){
  this.router.navigate([`/products/${isbn}`]);
}

home(){
  this.router.navigate(['/']);
}
placeorder(){
  for(var i of this.items){
    this.title.push(i.name);
    var q=i.name+"-"+i.quantity;
  this.quantity.push(q);
  this.isbn.push(i.isbn);
    
  }
  var mail=this.userservice.getUserMail();
  this.orderservice.addOrder(this.title,this.isbn,mail,this.quantity,this.tp,this.Address).subscribe(order=>{
    for(var i of this.isbn){
      this.cartService.deleteItem(i);
    }
    
    this.router.navigate(["/orderplaced"]);
  });

}
}
