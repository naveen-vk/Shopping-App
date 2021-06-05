import { AuthData } from './components/login/auth-data.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SignupData } from './components/signup/signup-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private token:any;
   private authStatusListner=new Subject<boolean>();
   private adminStatusListner=new Subject<boolean>();
   private isAuthenticated = false;

   private tokenTimer:any;
   private userMail:string="";
   isAdmin:any;

  constructor(private _http:HttpClient,private _router:Router) { }
  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  getIsAdminAuth(){
  
    return this.isAdmin;
  }
  getUserMail(){
    return localStorage.getItem('email');
  }
  getAuthStatusListner(){
  return this.authStatusListner.asObservable();
  }
  getAdminStatusListner(){
    return this.adminStatusListner.asObservable();
    }

  getUserByEmail(body:any){    //for data fetching purpose after login
    //console.log(body);
    return this._http.post("http://localhost:3000/api/getuserbyemail",{"email":body});

  }
   

  getUser(id:any):Observable<any>{  // for update purpose 
  
    return this._http.get(`http://localhost:3000/api/getuser/${id}`)
  }

  updateUser(id: any,data: any){
    console.log(data);
    return this._http.put(`http://localhost:3000/api/getuser`,{data,id})

  }





  signup(username:string,phnnumber:string,email:string,password:string){
    const authData: SignupData = { username:username,phnnumber:phnnumber,email: email, password: password };
    this._http
      .post("http://localhost:3000/api/signup", authData)
      .subscribe(() => {
        this._router.navigate(["/login"]);
      }, error => {
        this.authStatusListner.next(false);
      });
  }

  
  login(email:string,password:string){
    const authdata:AuthData={email:email,password:password};
    this._http.post<{token:string,expiresIn:number,emailId:string}>('http://127.0.0.1:3000/api/login',authdata)
    .subscribe(
      response=>{
        const token = response.token;
        this.token=token;
        if(token){
        const expiresInDuration=response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.tokenTimer=setTimeout(()=>{
          this.logout();
        },expiresInDuration*1000);
        this.isAuthenticated=true;
        this.userMail=response.emailId;
         console.log(this.userMail);
        this.authStatusListner.next(true);
        const time=new Date();
        const expirationDate=new Date(time.getTime()+expiresInDuration*1000);
        
         console.log(expirationDate);
        if(authdata.email==="admin@gmail.com"){
          this.isAdmin=true;
         this._router.navigate(['/admin']);
         this.adminStatusListner.next(true);
        }else{
          this.isAdmin=false;
       this._router.navigate(['/']);
      }
      this.saveAuthData(token,expirationDate,this.userMail);
    
    }
    
    },error =>{
      this.authStatusListner.next(false);
      this.adminStatusListner.next(false);
    });
  }

 
  
    autoAuthUser() {
      const authInformation = this.getAuthData();
      if (!authInformation) {
        return;
      }
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        if(authInformation.useremail=="admin@gmail.com"){
          this.isAdmin=true;
        }
  
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListner.next(true);
      }
    }
  

  logout(){
    this.token=" ";
  
  this.isAuthenticated=false;
  this.isAdmin=false;
    this.tokenTimer=0;
    this.authStatusListner.next(false);
    this.adminStatusListner.next(false);
    this.clearAuthData();
    this._router.navigate(['/login']);
  }
  
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token:string,expirationTime:Date,email:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationTime.toISOString());
    localStorage.setItem('email',email);
    
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
    
  }
  private getAuthData(){
    const time=new Date();
    const token=localStorage.getItem("token");
    const expirationDate:any=localStorage.getItem("expiration");
    const useremail=localStorage.getItem("email");
    if(!token && !expirationDate){
      return;
    }

    return{
      token:token,
      expirationDate:new Date(expirationDate),
      useremail:useremail
    }
  }
 
}
