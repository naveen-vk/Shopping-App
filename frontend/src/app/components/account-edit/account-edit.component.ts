import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { subscribeOn } from 'rxjs/operators';
//import { user } from './../../../../../backend-1/model/';
import { UserService } from './../../user.service';
//import { Routes} from './../../app-routing.module';



@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {
  submitted = false;
   editForm = new FormGroup({
    username: new FormControl(''),
    phnnumber:  new FormControl(''),
    email: new FormControl('')
  })


  constructor(
    private router: ActivatedRoute ,
     private userservie:UserService, 
     private _router:Router    ) {}
 
  ngOnInit(): void {
    console.log(this.router.snapshot.params._id);
    this.userservie.getUser(this.router.snapshot.params._id).subscribe((result)=>{
      console.log(result);
      this. editForm = new FormGroup({
        username: new FormControl(result['username']),
        phnnumber: new FormControl(result['phnnumber']),
        email: new FormControl(result['email'])
      })
    })

   

  /*  this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    })  */
  
  }

  get myForm() {
    return ;                 // CHECK CODE HERE BEFORE FINAL COMPILING
  }

  updateUser(){
    console.log(this.editForm.value)
    this.userservie.updateUser(this.router.snapshot.params._id,this.editForm.value).subscribe((result)=>{
      console.log(result,"data updated successfully")
      
    })
    this._router.navigate(['/account']);
  }


  

  


 

}






