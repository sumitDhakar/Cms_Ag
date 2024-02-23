import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { Roles } from 'src/app/entites/roles';
import { UserRoles } from 'src/app/entites/user-roles';
import { Users } from 'src/app/entites/users';
import { AdminRoleService } from 'src/app/services/admin/admin-role.service';
import { AdminUserRoleService } from 'src/app/services/admin/admin-user-role.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  constructor(private adminUserService: AdminUsersService, private employeeUserService: EmployeeUsersService, private activateRoute: ActivatedRoute,
    private departmentService: DepartmentService, private designationService: DesignationService
    , private authService: AuthService,
    private adminRoleService: AdminRoleService,
    private adminUserRoleService: AdminUserRoleService,private employeeDesignation:EmployeeDesignationService,
    private fb: FormBuilder) {
    this.myForm = this.fb.group({
      roleId: ['', [Validators.required]],
    });
    this.userRole = new UserRoles();;
  }

  
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  user: Users = new Users();
  confirmPassword = '';
  departments: Department[] = [];
  designations: Designation[] = [];
  isAdmin: any = false;
  roles: Roles[] = [];

  myForm: FormGroup;

  userRole: UserRoles;
  userRoles: UserRoles[] = [];

  department: Department = new Department();
  designation: Designation = new Designation();
  pageIndex = 0;
  pageSize = 100;
  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.user.id = param['id'];
      this.getUser();
      this.getAllDesignations();
      this.getAllDepartments();
      this.checkAdmin();
      this.getAllRoles();
      this.getUserRoles();
    })
  }

  // get all deparments 
  getAllDepartments() {
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departments = data;
    })
  }


  // get all designations 
  getAllDesignations() {
    this.employeeDesignation.getAllDesignation(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.designations = data;
    })
  }


  // getting all designations by selected department
  getAllDesignationsByDepartment(id: number) {

    this.designationService.getAllDesignationByDepartmentId(id).subscribe((data: any) => {
      this.designations = data;

    })
  }

  // fetching designatoin based on department id
  optionSelected(tag: any) {
    this.getAllDesignationsByDepartment(tag.value);
  }

  // get user by id
  getUser() {
    this.adminUserService.getUserById(this.user.id).subscribe((data: any) => {
      this.user = data;
      if (this.user.designation === null || this.user.designation === undefined)
        this.user.designation = new Designation();


    })
  }
  // update User
  updateEmployee() {
    this.adminUserService.updateEmployee(this.user).subscribe((data: any) => {

    })
  }

  checkAdmin() {
    let roles = this.authService.getUserRoles();



    this.isAdmin = roles?.includes("ADMIN");

  }



  getAllRoles() {
    this.adminRoleService.getAllRoles().subscribe((data: any) => {
      this.roles = data;
    })
  }

  getUserRoles() {
    this.adminUserRoleService.getUserRolesOfUser(this.user.id).subscribe((data: any) => {
      this.userRoles = data;
    })
  }

  setEditDate(id: any) {
    this.adminUserRoleService.getUserRoleById(id).subscribe((data: any) => {
      this.userRole = data;


    })
  }

  updateUserRole() {
    this.adminUserRoleService.updateUserRole(this.userRole).subscribe((data: any) => {
      this.getUserRoles();
      this.message('success', "User Role updated Successfully!!");
    })
  }

  setDelete(id: any) {
    this.userRole.id = id;
    alert(this.userRole.id)
  }
  deleteUserRole() {
    this.adminUserRoleService.deleteUserRoleBYyId(this.userRole.id).subscribe((Data: any) => {
      this.message('success', "User Role deleted Successfully!!");
    })
  }

  addUserRole() {
    this.userRole.userId = this.user.id;
    if (this.myForm.valid)
      this.adminUserRoleService.addUserRole(this.userRole).subscribe((data: any) => {
        this.userRole = new UserRoles();
        this.message('success', "User Role Added Successfully!!");
      })
  }


  message(icon: any, message: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: icon,
      title: message,
    });
    this.getUserRoles();
    this.userRole = new UserRoles();
  }

}
