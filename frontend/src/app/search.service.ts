import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private searchStatusListener = new Subject<boolean>();
  
  constructor(private _http:HttpClient) { }

  getsearchStatusListener(){
    return this.searchStatusListener.asObservable();
  }

  find(text:any){
    const body={title:text}
    this.searchStatusListener.next(true);
    return this._http.post('http://127.0.0.1:3000/api/search',body)
   }

}
