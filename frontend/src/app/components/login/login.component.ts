import { Component, OnInit } from '@angular/core';
import {FormGroup,AbstractControl, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

  
  constructor(public fb:FormBuilder,private _router:Router,private _userService:UserService) {}
  signin!: FormGroup;
  ngOnInit(): void{
    this.signin=this.fb.group({
        email: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

        pass: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
             
  })
 
  }
  get email(): AbstractControl{
    return this.signin.controls['email'];
  }
  get pass(): AbstractControl {
    return this.signin.controls['pass'];
  }
  
  datacapture(){
     this._userService.login(this.email.value, this.pass.value);
  
  }

  moveToSignup(){
    this._router.navigate(['/signup']);
  }

}
