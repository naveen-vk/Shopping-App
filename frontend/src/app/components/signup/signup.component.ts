import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormGroup,AbstractControl, FormControl,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {

  constructor(public fb:FormBuilder,private _router:Router,private _userService:UserService) {}
  signup!: FormGroup;
  
  ngOnInit(): void {
    this.signup=this.fb.group({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]),

        email: new FormControl('',[
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

        password: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),

          repass: new FormControl('',[
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            ]),
            phnnumber: new FormControl('',[
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(10),
              ]),
               
             
  })

 
  
}
onPasswordChange() {
  if (this.repass.value == this.password.value) {
    this.repass.setErrors(null);
  } else {
    this.repass.setErrors({ mismatch: true });
  }
}
get password(): AbstractControl {
  return this.signup.controls['password'];
}

get repass(): AbstractControl {
  return this.signup.controls['repass'];
}
get username(): AbstractControl{
  return this.signup.controls['username'];
}
get email(): AbstractControl{
  return this.signup.controls['email'];
}
get phnnumber(): AbstractControl{
  return this.signup.controls['phnnumber'];
}
 
datacapture(){
 
  this._userService.signup(this.username.value,this.phnnumber.value,this.email.value,this.password.value);
}
moveToLogin(){
  this._router.navigate(['/login']);
}
 
}
