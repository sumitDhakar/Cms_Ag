import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Department } from 'src/app/entites/department';
import { Permissions } from 'src/app/entites/permissions';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  myForm: FormGroup;

  constructor(private departmentservice: DepartmentService, private fb: FormBuilder,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
     private authService: AuthService, private location: Location) {
    this.myForm = this.fb.group({
      title: new FormControl('', [Validators.required,Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(2)]),
      description: ["", [Validators.required, , Validators.minLength(10), Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.setPermissions();
    this.setBaseUrl();
  }

  baseRoute = 'employee-dash'

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  addForm(){
    this.myForm.reset();
  this.  department= new Department();
 
  }
  permissions: Permissions = new Permissions();
  setPermissions() {
    this.authService.isUserPermitted(this.location.path(), false).then(data => {
      if (data == null)
        this.authService.navigate(this.baseRoute);
      this.permissions = data;
    })
  }



  deleteId = 0;
  searching: Department = new Department();


  departments: Department[] = [];
  department: Department = new Department();
  confirmPassword = '';
  isListView = false;
  searchDepartments: Department[] = [];


    addDepartment() {

    if (this.myForm.valid) {
      this.departmentservice.addDepartment(this.department).subscribe((data: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        Toast.fire({
          icon: 'success',
          title: 'Department Created Successfully !!'
        }).then(e => {
          this.department = new Department();
          this.getAllDepartments();
          this.myForm.reset();
         
        })
      }, err => {
        console.log(err)
        if(err.error.status == 409){
          this.sweetAlertMessages.alertMessage('error','Depatment Name Already Exist.')

        }
      });
    }
    AppUtils.modelDismiss("add");
  
  }

  sequence:any=0;
  getAllDepartments() {
    this.departmentservice.getAllDepartment().subscribe((data: any) => {
      this.searchDepartments = data;
      this.departments = data;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  setEditData(id: number) {
    this.departmentservice.getDepartmentById(id).subscribe((data: any) => {
      this.department = data;
    });

  }

  updateDepartment() {
    this.departmentservice.updateDepartment(this.department).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success','Department Update successfully.')
      AppUtils.modelDismiss("eadit");
  
      this.getAllDepartments();
      this.  department= new Department();
 

    }, (err: any) => {
      if(err.error.status>0)
      this.sweetAlertMessages.alertMessage('error',err.error.message); 
      
      else 
           this.sweetAlertMessages.alertMessage('error', err.error.status); 
      
          });
      
        
  }

  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }


  filter() {
    if(this.searching.title.trim()==''||this.searching.title==null)
    {
    
    return;
    }
    

    this.departmentservice.searchDepartment(this.length, this.pageSize, this.searching).subscribe((data: any) => {
      
      this.departments = data.content;
    })
  }
  setDeleteData(id: number) {
    this.deleteId = id;
  }

  deleteDepartment() {
    console.log(this.deleteId)
    this.departmentservice.deleteDepartment(this.deleteId).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success','Department Deleted successfully.')
      
      this.getAllDepartments();
    })
  }

  
  
  /// pagination 
  length = 50;
  pageSize = 1000000;
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
    this.getAllDepartments();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  }


  


