import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from './model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items : Item[]=[];
    

  private itemsUpdated = new Subject<Item[]>()
  constructor ( private _http: HttpClient,private user:UserService){}
  getItems(){
    var mail = this.user.getUserMail();
      this._http
          .get<{message : string,items : any}>('http://localhost:3000/api/item/'+mail)
          .pipe(map((itemData)=> {
              return itemData.items.map((items: any) => {
                  return {
                      id : items._id,
                      name : items.name,
                      pages : items.pages,
                      quantity : items.quantity,   
                      thumbnailUrl : items.thumbnailUrl,
                      author : items.author,
                      price : items.price,
                      discount:items.discount,
                      currency:items.currency,
                      isbn:items.isbn               
                  }
                  
                  
              })
          }))
          .subscribe(transformedItem => {
              this.items = transformedItem;
              this.itemsUpdated.next([...this.items]);
          })
  }
  deleteItem(isbn: any){
      this._http.delete("http://localhost:3000/api/item/"+isbn)
          .subscribe(()=>{
              const updatedItems = this.items.filter(item =>item.isbn !==isbn);
              this.items = updatedItems;
              this.itemsUpdated.next([...this.items]);
          })
  }
  getUpdateListner(){
      return this.itemsUpdated.asObservable();
  }

  addtocart(product:any){
    var mail = this.user.getUserMail();
    const body={email:mail,title:product.title,img:product.thumbnailUrl,price:product.price,discount:product.discount,currency:product.currency,author:product.authors,pages:product.pageCount,isbn:product.isbn}
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
  }
  

}
