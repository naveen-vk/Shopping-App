import { PlaceOrderData } from './components/cart/place-order.model';
import { OrderData } from './components/adminorders/order-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders:OrderData[]=[]

  constructor(private _http:HttpClient,private user:UserService) { }
  private ordersUpdated = new Subject<OrderData[]>();
  getOrder() {
    var status="order placed"
    this._http
      .get<{ message: string; orders: any }>(
        "http://localhost:3000/api/getorder/"+status
      )
      .pipe(map((OrderData) => {
        return OrderData.orders.map((orders: { OrderId: any; isbn: any; productname: any;email:any; quantity: any; price: any; address: any; status: any; }) => {
          return {
            OrderId: orders.OrderId,
            isbn: orders.isbn,
            productname: orders.productname,
            email:orders.email,
            quantity: orders.quantity,
            price: orders.price,
            address: orders.address,
            status: orders.status
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.orders = transformedPosts;
        this.ordersUpdated.next([...this.orders]);
      });
  }
  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }

  Orders( ) {
     const email=localStorage.getItem("email");
    this._http
      .get<{ message: string; orders: any }>(
        "http://localhost:3000/api/orders/"+email
      )
      .pipe(map((OrderData) => {
        return OrderData.orders.map((orders: { OrderId: any; isbn: any; productname: any;email:any; quantity: any; price: any; address: any; status: any; }) => {
          return {
            OrderId: orders.OrderId,
            isbn: orders.isbn,
            productname: orders.productname,
            email:orders.email,
            quantity: orders.quantity,
            price: orders.price,
            address: orders.address,
            status: orders.status
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.orders = transformedPosts;
        this.ordersUpdated.next([...this.orders]);
      });
  }
  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }


  addOrder( productname: any,isbn:any,email:any, quantity: any, price: any, address: any) {
    const order= { 
      isbn:isbn,
      productname: productname,
      email:email,
      quantity: quantity,
      price: price,
      address: address,
      };
    return this._http
      .post("http://localhost:3000/api/addorder", order)
      }

      

updatestatus(OrderId:any){
   const status={
     OrderId:OrderId
   };

this._http.post("http://localhost:3000/api/updatestatus",status).
subscribe(data=>{
  this.ordersUpdated.next([...this.orders]);
})
console.log("clicked 2")
  }


  /*addtocart(product:any){
    var mail = this.user.getUserMail();
    const body={email:mail,title:product.title,img:product.thumbnailUrl,price:product.price,discount:product.discount,currency:product.currency,author:product.authors,pages:product.pageCount}
    console.log(body);
    return this._http.post('http://127.0.0.1:3000/api/cart',body,{
      observe:"body",
      headers:new HttpHeaders().append('Content-Type','application/json')
    })
  }

  getcart(){
    var mail = this.user.getUserMail();
    return this._http.get('http://localhost:3000/api/cart/'+mail).pipe(
      map((result:any) => {
        let productNames: string[] = []
        result.forEach((item: { name: string; }) => productNames.push(item.name))
        return productNames;
      })
    )
  }*/
  



}
