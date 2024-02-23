import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/entites/auth';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { RouteUtilService } from 'src/app/materials/route-util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  myForm: FormGroup;

  constructor(private authService:AuthService,private activateRoute:ActivatedRoute,
             private router:Router, private snack:MatSnackBar,private fb: FormBuilder,
           private routeUtils:RouteUtilService) {
              this.myForm = this.fb.group({
                email: ['', [Validators.required,Validators.email]],
                password: new FormControl('', [Validators.required,]),
              });
            }
  email:any="";
  otp:any='';

  auth:Auth=new Auth();

  ngOnInit(): void {
    // reading params
   
   if(this.authService.isLoggedIn()){
    this.getCurrentUser();
   }
   else
      this.activateRoute.queryParamMap.subscribe(param=>{
         this.email = param.get('email')
         this.otp=param.get('value')
        this.verifyUser();
      })
  }

  // verify user by email and otp
  verifyUser(){
    if(this.email!=undefined||this.email!=null)
        this.authService.verifyUser(this.email,this.otp).subscribe((data:any)=>{
          console.log(data);
          this.router.navigate(['login'])
        },(err)=>{
          this.router.navigate(['login']);
        })
  }

  // login user
  isValidDetails(){
    if(this.auth.email.length<10){
      this.snack.open("Email Required !!!!","ok",{
        duration:3000,
      });
      return false;
    }
    if(this.auth.password.length<1){
      this.snack.open("passord Required !!!!","ok",{
        duration:3000,
      });
      return false;
    }
    return true;
  }
   

getPermissionAccess(){
  this.authService.getPermissionAccess().subscribe((data:any)=>{
 //   this.router.navigate(['dollop']);
  },(err)=>{
    console.log(err);
      if(err.status==401){
        this.snack.open("Session expired !!!","Login",{
          duration:1000,
        });
           localStorage.clear();
        this.router.navigate(['login']);
      }

  })
}
  
getCurrentUser(){
  this.authService.getCurrentUser().subscribe((data:any)=>{
    this.authService.setUser(data);
     this.routeUtils.openUserDashboard();
     this.authService.user.next(data);
    //  console.log(data);
    // console.log(this.router.config);
  },(err)=>{
    if(err.status==401){
      localStorage.clear();
      this.router.navigate(['login']);
    }
  })
}



public firstTaskFormControl() {
  Object.keys(this.myForm.controls).forEach(key => {
    const control = this.myForm.get(key)
;
    if (control) {
      control.markAsTouched();
    }
  });
  const firstInvalidControl = document.querySelector('input.ng-invalid');
  if (firstInvalidControl) {
    firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}



procedeLogin(){
  localStorage.clear();
  this.firstTaskFormControl();
  if(this.myForm.valid)
  this.authService.login(this.auth).subscribe(
    (data: any) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'login success !!'
      }).then(e => {
        this.myForm.reset();
        this.authService.setToken(data.token);
        this.getPermissionAccess();
          
              this.getCurrentUser();
       
      })
    },
    (err) => {
      console.log(err);
      if(err.status==404){
        this.snack.open("No Such User Found Try With Anouther Email or PAssword !!!","Try again",{
          duration:3000,
        });
      }
      if(err.status==401){
        this.snack.open("Invalid Credentials !!!","Try again",{
          duration:3000,
        });
      }
      else if(err.status==0){
        this.snack.open("Something went wrong!!!","Try again",{
          duration:3000,
        });
      }
    }
  )
}



}
