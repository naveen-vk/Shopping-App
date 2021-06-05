import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  User:any = [];

  constructor(public userserice:UserService) { 
    var userID=window.localStorage.getItem('email');
    this.userserice.getUserByEmail(userID).subscribe(data=>this.User=data)
    //this.readUser();
  }

  ngOnInit(): void {
    
  }

  /*readUser(){
    this.userserice.getUserByEmail('email').subscribe((data) => {
      console.log(data);
     this.User = data;
    })    
  }*/


  

}
