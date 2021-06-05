import { UserService } from 'src/app/user.service';
 
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userID:any=""
  constructor(private authService:UserService) { }
//Products: Array<Product>= [
  // {Name :'Iphone 11 pro' ,
  //  Price: 1500,
  //  Desc:'Mobile Phone',
  // ProductPath: 'assets/pics/iphon11.jpg',
  // },
// ];

  ngOnInit(): void {
    this.userID=this.authService.getUserMail();
  }

}
