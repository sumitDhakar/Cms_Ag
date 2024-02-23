import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/entites/users';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent implements OnInit {

  email: any = '';
  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    alert(this.email)
    this.userBasic.email = this.email;
    alert(this.userBasic.email)

  }

  constructor(private usersService: AuthService,
    private router: Router) { }

  userBasic: Users = new Users();

  addBasicDetails() {
    this.usersService.addEmployeeBasicDetails(this.userBasic).subscribe((data: any) => {

      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Your Basic Details Saved  successfully !!'
      }).then(e => {
        this.userBasic = new Users();
        this.router.navigate(['login']);

      })
    },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        if (err.status == 302)
          Toast.fire({
            title: 'User add failed !!',
            icon: 'error',
            text: err.error.message,
            timer: 5000 // 5 seconds,
          })
        else
          Toast.fire({
            title: 'Create User failed !!',
            icon: 'error',
            text: "Something Went Wrong",
            timer: 5000 // 5 seconds,
          })
      }
    )



  }




  selectFile(event: any) {


    this.userBasic.userImage = event.target.files[0];

  }

}
