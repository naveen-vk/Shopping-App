import { UserService } from 'src/app/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy{
  authListnerSubs: any;
  adminListnerSubs: any;
userIsAuthenticated:boolean=false;
adminIsAuthenticated:boolean=false;
searchtext:any;
  constructor(private authService:UserService,private router:Router,private searchService:SearchService) { }

  isopen:boolean=false;
 
  togglenav(){
    this.isopen=!this.isopen;
  }
  
  ngOnInit() {
 

    const bool =new Boolean(this.authService.getIsAuth());
    this.userIsAuthenticated=(bool.valueOf());
    
this.authListnerSubs=this.authService.getAuthStatusListner()
.subscribe(isAuthenticated=>{
  this.userIsAuthenticated=isAuthenticated;
 console.log("user:"+isAuthenticated);
});


const bool2 =new Boolean(this.authService.getIsAdminAuth());
this.adminIsAuthenticated=(bool2.valueOf());

this.adminListnerSubs=this.authService.getAdminStatusListner()
.subscribe(isAuthenticated=>{
this.adminIsAuthenticated=isAuthenticated;
console.log("admin:"+isAuthenticated);
});
     
// this.authListnerSubs=this.authService.getAuthStatusListner()
// .subscribe(isadmin=>{
//   const adminis=new Boolean(localStorage.getItem('user'));
//   isadmin=(adminis.valueOf());
//  console.log("admin:"+isadmin);
 
// });
 }



 find(text:any){
  this.searchService.getsearchStatusListener().subscribe(()=>{
  })
  this.router.navigate([`/search/${text}`]);
  
 }

//   isAdmin() {
//     const userStr:any = localStorage.getItem('email');
//   console.log(userStr);
//     if(userStr==='admin@gmail.com'){
//       console.log(5);
//       this.adminIsAuthenticated=true;
//      // window.location.reload();
//     }else{
//       console.log(125);
//       this.adminIsAuthenticated=false;
//       //window.location.reload();
//     }
//  localStorage.setItem('user',this.adminIsAuthenticated.toString());
// //  window.location.reload();
//   }
  onLogout(){
    this.authService.logout();
    this.adminIsAuthenticated=false;
    localStorage.removeItem('user');
  }
  ngOnDestroy(){
  
    this.authListnerSubs.unsubscribe();
    this.adminIsAuthenticated=false;
  }

}
