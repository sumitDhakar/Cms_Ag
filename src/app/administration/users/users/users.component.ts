import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AdministiationUser } from 'src/app/entites/administiation-user';

import { Designation } from 'src/app/entites/designation';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { AdministiationUserService } from 'src/app/services/administiation-user.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  isListView: any;
  users:Users[]=[];
user!:Users;
searching:Users=new Users();

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllDesignations();
  }
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  constructor(private adminUserService:AdminUsersService, private designationService: EmployeeDesignationService) {
  this.searching.designation=new Designation();
  }


setEditDate(id:any){
  this.adminUserService.getUserById(id).subscribe((data:any)=>{
     this.user = data;
  })
}

updateUser(){
  this.adminUserService.updateEmployee(this.user).subscribe((data:any)=>{
    
  })
}


  getAllUsers(){
        this.adminUserService.getAllUsers(this.pageIndex,this.pageSize).subscribe((data:any)=>{
          this.users = data.content;
          this.length=data.totalElements;

        })
  } 

  deleteId=0;
 confirm (id:any){
 this.deleteId=id;
 }

 deleteUsers()
{

  this.adminUserService.deleteEmployee(this.deleteId).subscribe((data: any) => {
    
    Swal.fire("Deleted!", "users Delete SuccesFully", "success");
    this.getAllUsers();
    
  })

 


  }
  
  designations: Designation[] = [];
  getAllDesignations() {
    this.designationService.getAllDesignation(this.pageIndex, 1000).subscribe((data: any) => {
      this.designations = data;
    })
  }  
  // searching the user
  filter() {
    console.log(this.searching);
    //this.searching.designation.setDepartment(null);
    this.adminUserService.searchEmployee(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.users = data.content;
      console.log(data);

      this.length = data.totalElements
    })
  }
  



  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  


/// pagination 
length = 50;
pageSize = 5;
pageIndex = 0;
pageSizeOptions = [1, 2, 5];

hidePageSize = false;
showPageSizeOptions = true;
showFirstLastButtons = true;
disabled = false;
pageEvent!: PageEvent;

handlePageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex;
this.getAllUsers();
}

}
