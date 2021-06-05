import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Subject} from 'rxjs';
//import 'rxjs/add/operator/map';
import {Contactus} from './components/contactus/contactus.model'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  feedback=[];
  
  readonly baseURL="http://localhost:3000/api/feedback"
  constructor(private _http:HttpClient) { }
  private feedbackUpdated = new Subject<Contactus[]>();


  postContactus(emp:Contactus){
    return this._http.post(this.baseURL,emp);
  }


getfeedback(){
  var status="has to resolve"
 return this._http.get('http://localhost:3000/api/getfeedback/'+status)
}



updatestatus(email:any){
  const status={
    email:email
  };

this._http.post("http://localhost:3000/api/feedbackstatus",status).
subscribe(data=>{

})
 }

  // getfeedback() {
  //   this._http
  //     .get<{ message: string; feedback: any }>(
  //       "http://localhost:3000/api/getfeedback"
  //     )
  //     .pipe(map((Contactus) => {
  //       return Contactus.feedback.map((feedback: {status:any; _id:any;name:any;email:any;subject:any;desc:any;}) => {
  //         return {
  //           _id: feedback._id,
  //           name: feedback.name,
  //           email: feedback.email,
  //           subject:feedback.subject,
  //           desc: feedback.desc,
  //           status: feedback.status,
  //         };
  //       });
  //     }))
  //     .subscribe(transformedPosts => {
  //       this.feedback = transformedPosts;
  //       this.feedbackUpdated.next([...this.feedback]);
  //     });
  // }
  getOrderUpdateListener() {
    return this.feedbackUpdated.asObservable();
  }

}
