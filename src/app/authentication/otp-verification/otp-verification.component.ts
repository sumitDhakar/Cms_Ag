import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  Router } from '@angular/router';
import { Auth } from 'src/app/entites/auth';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {


  constructor(private authService: AuthService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private router: Router, private snack: MatSnackBar) {
  }
  email: any = "";
  otp: any = '';

  auth: Auth = new Auth();

  ngOnInit(): void {

  }
  otp1 = '';
  otp2 = '';
  otp3 = '';
  otp4 = '';
  // verify user by email and otp
  verifyUser() {
    this.authService.changeEmail.subscribe({
      next:(data:any)=>{
        this.email = data;

      }
    })
    if (this.email != undefined || this.email != null)
      this.otp = this.otp1 + this.otp2 + this.otp3 + this.otp4;
    this.authService.verifyUser(this.email, this.otp).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success','Your Otp Is Verified successfully.')

     this.otp1 = '';
     this.otp2 = '';
     this.otp3 = '';
     this.otp4 = '';
     this.authService.myOtp.next(this.otp);
     this.otp='';
     this.authService.email.next(this.email);
     this.router.navigate(['forget']);
    }, (err) => {
      console.log("Invalid Otp"+err.error.status);

      if(err.status===401){
        this.sweetAlertMessages.alertMessage('error',err.error.message)

      }
      if(err.status===404){
        this.sweetAlertMessages.alertMessage('error',"Your Otp Is Already Used");

      }

    })
  }
  resendOpt() {
    this.authService.changeEmail.subscribe({
      next:(data:any)=>{
        this.email=data;
      }
    })
     if (this.email != undefined || this.email != null)
       this.authService.resendOptForEmailVerification(this.email,"resend").subscribe((data: any) => {
     this.authService.email.next(this.email);
        Swal.fire({
          title: "Resend Email SuccessFully!!",
          text:" Check Your  Mail Inbox !!",
          icon: "success"
        });
      }, (err) => {
        if(err.status===401){
          Swal.fire({
            title: "TimeOut?",
            text: err.error.message,
            icon: "error"
          });
        }
        if(err.status===404){
          Swal.fire({
            title: "Not Found !!",
            text: err.error.message,
            icon: "error"
          });
        }
    })
  }

}

