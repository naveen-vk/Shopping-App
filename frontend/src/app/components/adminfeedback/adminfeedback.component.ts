 
import { Component, OnInit } from '@angular/core';
import { Contactus } from '../contactus/contactus.model';
import { ContactusService } from '../../contactus.service'
@Component({
  selector: 'app-adminfeedback',
  templateUrl: './adminfeedback.component.html',
  styleUrls: ['./adminfeedback.component.css']
})
export class AdminfeedbackComponent implements OnInit {
  feedback:any;
  
  constructor(private contactusService:ContactusService) { }

  ngOnInit(): void {
    this.contactusService.getfeedback().subscribe((res:any)=>{
      return this.feedback=res;
  
    })
  }
    updatestatus(userId:any){

      this.contactusService.updatestatus(userId);
      window.location.reload();
    
  }

}
