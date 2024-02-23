import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from 'src/app/entites/auth';
import { ChangePassword } from 'src/app/payload/ChangePasswordUtils';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-verification',
  templateUrl: './forget-verification.component.html',
  styleUrls: ['./forget-verification.component.scss']
})
export class ForgetVerificationComponent {

  myForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder,
    private router: Router, private snack: MatSnackBar) {
    this.myForm = this.fb.group({
         password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  confirmPassword: string = '';
  auth: Auth = new Auth();

otp =''
  changeForgetPassword() {
   this.firstTaskFormControl();
      if (this.myForm.valid&&this.passwordMatchValidator()&&this.auth.password==this.confirmPassword) {
        
        this.authService.changeEmail.subscribe({
          next:(data:any)=>{
            this.auth.email=data;
          }
        })
        this.authService.usedOtp.subscribe({
          next:(data:any)=>{
        this.otp = data;
          }
        })
        this.authService.changeForgetPassword(this.auth,this.otp).subscribe(
          (data: any) => {
            Swal.fire({
              title: "Password Changed ",
              text: "Enter With New Password!!",
              icon: "success"
            });
              this.confirmPassword = '';
            this.myForm.reset();
            this.router.navigate(['login'])
          },
          (err) => {
            console.log(err.error.status);
            if (err.error.status == 401)
              Swal.fire({
                title: "Error",
                text: "Invalid Otp!!",
                icon: "question"
              }); 
                if (err.error.status == 404)
              Swal.fire({
                title: "Error",
                text: "User Not Found!!",
                icon: "question"
              });
          })
      }
      else{
        return;
      }
    

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

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password: any = control.get('password');
      const confirmPassword: any = control.get('confirmPassword');

      if (password.value !== confirmPassword.value) {
        return { passwordMatch: true };
      } else {
        return null;
      }
    };
  }

}
