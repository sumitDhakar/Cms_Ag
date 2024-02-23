import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/entites/user-registration';
import { RouteUtilService } from 'src/app/materials/route-util.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


  myForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar,private fb: FormBuilder,  private routeUtils:RouteUtilService) {
      this.myForm = this.fb.group({
        userName:  ['', [Validators.required,Validators.minLength(3)]],
        email:  ['', [Validators.required,Validators.email]],
        password:  ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)]],  
        confirmPassword: ['', [Validators.required]],
      }, {
        validators: this.passwordMatchValidator(),
      });
    }
  
  ngOnInit(): void {

  }

  userRegistration: UserRegistration = new UserRegistration();
  confirmPassword: string = "";


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
  

  registration(){
    this.firstTaskFormControl();
    if (this.myForm.valid)     {
      Swal.fire({
        title: 'Check Your Gmail Inbox',
        text:'Verifaction Opt is Send!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      let email ='';
      this.authService.registration(this.userRegistration).subscribe(
      (data: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Your Details Are Send For Verification!!'
        }).then(e => {
          email = data.email;
          this.userRegistration = new UserRegistration();
          this.myForm.reset();
      localStorage.setItem("email",email); 

          this.router.navigate(['otpVerification']);
        })
      },
      (err) => {

  if(err.status==302){
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          title: 'User already exists!!',
          icon: 'error',
          text: 'Try another Email !!!',
          timer: 5000 // 5 seconds,
        }).then(e=>{
          this.userRegistration = new UserRegistration();

        })
      }}
      )
    }
  }



 passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const password :any= control.get('password');
    const confirmPassword:any = control.get('confirmPassword');

    if (password.value !== confirmPassword.value) {
      return { passwordMatch: true };
    } else {
      return null;
    }
  };
}
  

checkIsloggedIn(){
  if(this.authService.isLoggedIn()){
    this.getCurrentUser();
   }
   else{
    localStorage.clear();
    this.router.navigate(['login']);
   }
}


getCurrentUser(){
  this.authService.getCurrentUser().subscribe((data:any)=>{
       this.authService.setUser(data);
    
   this.routeUtils.openUserDashboard();
 
 console.log(this.router.config);
      
  },(err)=>{
   
      localStorage.clear();
      this.router.navigate(['login']);
    
  })
}
}
