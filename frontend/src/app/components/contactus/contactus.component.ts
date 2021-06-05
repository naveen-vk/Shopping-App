import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Contactus } from './contactus.model';
import { ContactusService } from '../../contactus.service'

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  providers:[ContactusService]
})
export class ContactusComponent implements OnInit {
  feedback:Contactus[]=[];
  private postsSub:any;
 constructor(private contactusService:ContactusService){}
  ngOnInit(): void {

    
  }
  onSubmit(form:NgForm){
    this.contactusService.postContactus(form.value).subscribe((res)=>{
      alert('Thanks for Feedback');
  });
    console.log(form.value)         // FORM DATA VALUE 

  }
 
  
}
