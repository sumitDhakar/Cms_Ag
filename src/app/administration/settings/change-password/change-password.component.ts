import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePassword } from 'src/app/payload/ChangePasswordUtils';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {


  myForm: FormGroup;

  constructor(private authService: AuthService,
    private snack: MatSnackBar, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)/)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator(),
    });
  }

  changePasswordUtil: ChangePassword = new ChangePassword();
  confirmPassword: string = "";


  addForm(){
    this.myForm.reset();
  }
  changePassword() {
    this.firstTaskFormControl();
    if (this.myForm.valid) {

      this.authService.changePassword(this.changePasswordUtil.oldPassword, this.changePasswordUtil.newPassword).subscribe(
        (data: any) => {
          Swal.fire({
            title: "Password Changed ",
            text: "SuccesFully!!",
            icon: "success"
          });
          this.myForm.reset();
          this.changePasswordUtil = new ChangePassword();
          this.confirmPassword = '';
        },
        (err) => {
          console.log(err.status);
          if (err.status == 400)
            Swal.fire({
              title: "Error",
              text: "Password And Old Password Not Match!!",
              icon: "question"
            });
        })
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password: any = control.get('newPassword');
      const confirmPassword: any = control.get('confirmPassword');

      if (password.value !== confirmPassword.value) {
        return { passwordMatch: true };
      } else {
        return null;
      }
    };
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
}
