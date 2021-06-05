
import { BookData } from './components/admin/book-data.model';
 
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
 

@Injectable({
    providedIn: 'root'
  })
  export class BookService {
    constructor(private _http:HttpClient,private _router:Router) { }  
    private headers = new HttpHeaders().set('content-Type','application/json');
   
addbook(title:string,
 
  pageCount:string,
  publishdate: string,
  thumbnailUrl: string,
  shortDescription: string,
  longDescription: string,
  authors: string,
  categories: string,
  price: string,
  currency: string,
  discount: string,){
  const BookData: BookData = { title:title,  pageCount:pageCount,
    publishdate:publishdate,thumbnailUrl: thumbnailUrl, shortDescription: shortDescription,
    longDescription:longDescription,authors:authors,categories:categories,price:price,currency:currency,discount:discount};
  console.log(BookData);
    this._http.post("http://localhost:3000/api/admin", BookData)
    .subscribe(() => {
      this._router.navigate(["/admin"]);
    },error=>{
      console.log("error in book service");
    });
}


updateproduct(obj:any,id:any){ 
  
  return this._http.put<any>("http://localhost:3000/api/updateproduct" ,{obj,id});
}
readbooks(){
  return this._http.get("http://localhost:3000/api/getbooks",{headers:this.headers});
}

deleteBook(isbn: any) {
  return this._http
    .delete("http://localhost:3000/api/deleteBook/" + isbn);
}

getproduct(isbn:any){

  return this._http.get('http://127.0.0.1:3000/api/getbooks/'+isbn)
    

 
  }
}