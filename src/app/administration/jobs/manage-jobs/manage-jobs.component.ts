import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { ManageJobs } from 'src/app/entites/manage-jobs';

import { Users } from 'src/app/entites/users';
import { ManageJobsService } from 'src/app/services/manage-jobs.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Permissions } from 'src/app/entites/permissions';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent implements OnInit {

  myForm: FormGroup;
 
  manageJob: ManageJobs = new ManageJobs();
  manageJobs: ManageJobs[] = [];
  searching: ManageJobs = new ManageJobs();

  constructor(private location: Location, private authService: AuthService,private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private builder: FormBuilder,  private departmentService: DepartmentService, private designationService: DesignationService,
    private manageJobService: ManageJobsService,private employeeDesignation:EmployeeDesignationService
  ) { this.myForm = this.builder.group({
    
  //     jobTitle: ['', [Validators.required]],
  //    jobLocation: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(50)]],
  //    noOfVacancies: ['', [Validators.required,  Validators.pattern("^[0-20]$"), Validators.min(2), Validators.max(20)]],
  //  experience: ['', [Validators.required, Validators.pattern("^[0-20]$"), Validators.min(1), Validators.max(20)]],
  //  department: ['', [Validators.required]],
  //    description: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(250)]],
  //    expiredDate: ['', [Validators.required]], 
  //   startDate: ['', [Validators.required]],
  //     salaryTo: ['', [Validators.required,666666666666666666, Validators.min(100), Validators.max(100000)]],
  //   salaryFrom: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(100), Validators.max(100000)]],
  // // totalAppliedCandidates: ['', [Validators.required,  Validators.pattern("^[0-9]{1}$"), Validators.minLength(1), Validators.maxLength(1)]],
  //  //noOfViews: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
  //  age: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.min(18), Validators.max(99)]],
  }),
    this.manageJob.department = new Department();
    this.manageJob.jobTitle = new Designation();
  }
  
  addForm(){
    this.myForm.reset();
  }
  ngOnInit(): void {
    this.getAllDesignations();
    this.getAllDepartments();
    this.getAllManageJobs();
    this.setPermissions();
    this.setBaseUrl();
  }

  baseRoute = 'employee-dash'

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  permissions: Permissions = new Permissions();
  setPermissions() {
    this.authService.isUserPermitted(this.location.path(), false).then(data => {
      if (data == null)
        this.authService.navigate(this.baseRoute);
      this.permissions = data;
    })
  }


  departments: Department[] = [];
  designations: Designation[] = [];



  getAllDepartments() {

    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departments = data;
    })
  }

  getAllDesignations() {
    this.employeeDesignation.getAllDesignation(0, 1000).subscribe((data: any) => {
      this.designations = data;
    })
  }

  getAllDesignationsByDepartment(id: any) {
    this.designationService.getAllDesignationByDepartmentId(id.value).subscribe((data: any) => {
      this.designations = data;

    })
  }

  optionSelected(tag: any) {
    this.getAllDesignationsByDepartment(tag.value);
    this.manageJob.department.id=tag.value;
  }


  // adding employee
  addManageJobs() {
    // AppUtils.formSubmittion(this.myForm);
    // if (!this.myForm.valid) {
    //   //console.log("invalid");
    //   return;
    // }

    this.manageJobService.addManageJobs(this.manageJob).subscribe((data: any) => {
      this.getAllManageJobs();
      this.sweetAlertMessages.alertMessage('success', 'Manage Jobssuccessfully.')
     
    this.manageJob.department = new Department();
    this.manageJob.jobTitle = new Designation();
    
      AppUtils.modelDismiss('add');
    }, (err: any) => {
      console.log(err);
      this.sweetAlertMessages.alertMessage('question', err.status);
    });

  

  }
  sequence:any=0;
 
  
  getAllManageJobs() {
    this.manageJobService.getAllManageJobs(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.manageJobs = data.content;
      this.length = data.totalElements
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  // setting data in edit form
  setEditData(id: number) {
    this.manageJobService.getManageJobById(id).subscribe((data: any) => {
      this.manageJob = data;
    });
  }

  // updating data
  updateManageJobs() {
    this.manageJobService.updateManageJob(this.manageJob).subscribe((data: any) => {
      this.getAllManageJobs();
    })
  }



  // searching the user
  filter() {
    console.log(this.searching);
    //this.searching.designation.setDepartment(null);
    this.manageJobService.searchManageJob(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.manageJobs = data.content;
    })
  }

  // setting id for delete
  confirm(id: number) {
    this.manageJob.id = id;
  }

  //  deleteManageJob
  deleteManageJob() {
    this.manageJobService.deleteManageJob(this.manageJob.id).subscribe((data: any) => {
      this.manageJobs = this.manageJobs.filter(a => {
        return a.id != this.manageJob.id;
      })
    })
  }

  

  updateManageJobStatus(id: number, status: string, ofType: string) {
    this.manageJobService.ManageJobsByStatus(status, id, ofType).subscribe((data: any) => {
      this.getAllManageJobs();
    });
  }

   // pagination

   length = 1000000;
   pageIndex = 0;
   pageSize=10;
   pageSizeOptions = [1, 2, 5,10];
 
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
     this.getAllManageJobs();
   }
 
   setPageSizeOptions(setPageSizeOptionsInput: string) {
     if (setPageSizeOptionsInput) {
       this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
     }
 
   }
 
   
 

}

