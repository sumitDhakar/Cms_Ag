import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { PerformanceIndicator } from 'src/app/entites/performance-indicator';
import { Permissions } from 'src/app/entites/permissions';
import { Users } from 'src/app/entites/users';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { PerfomanceaIndicatorService } from 'src/app/services/perfomancea-indicator.service';

@Component({
  selector: 'app-performance-indicator',
  templateUrl: './performance-indicator.component.html',
  styleUrls: ['./performance-indicator.component.scss']
})
export class PerformanceIndicatorComponent implements OnInit {

  E:FormGroup;
  
  performanceIndicator: PerformanceIndicator = new PerformanceIndicator();
  designations: Designation[] = [];
  performanceIndicators: PerformanceIndicator[] = [];
  searching: PerformanceIndicator = new PerformanceIndicator();

  constructor(
    private perfomanceIndicatorService: PerfomanceaIndicatorService,
    private employeeDesignation: EmployeeDesignationService,
    private location: Location,
    private authService: AuthService, private builder: FormBuilder,
  ) {
    this.E = this.builder.group({    
            
      designation: ['', [Validators.required]],
      customerExperience: ['', [Validators.required]],
      marketing: ['', [Validators.required]],
      management: ['', [Validators.required]],
      administration: ['', [Validators.required]],
      presentationSkill: ['', [Validators.required]],
      qualityOfWork: ['', [Validators.required]],
      efficiency: ['', [Validators.required]],
      integrity: ['', [Validators.required]],
      professionalism: ['', [Validators.required]],
      teamWork: ['', [Validators.required]],
      criticalThinking: ['', [Validators.required]],
      conflictManagement: ['', [Validators.required]],
      attendance: ['', [Validators.required]],
      abilityToMeetDeadline: ['', [Validators.required]],
         
    
    
    
        });
      
    this.performanceIndicator.designation = new Designation();
    this.performanceIndicator.designation.department = new Department();
    this.searching.designation = new Designation();


  }

  ngOnInit(): void {
    this.getAllPerformanceIndicator();
    this.getAllDesignations();
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



  users: Users[] = [];
  departments: Department[] = [];

  addForm() {
    this.performanceIndicator = new PerformanceIndicator();
    this.performanceIndicator.designation = new Designation();
  }

  getAllDesignations() {
    this.employeeDesignation.getAllDesignation(1, 100).subscribe((data: any) => {
      this.designations = data;
    })
  }


  // adding performance Indicator
  addPerformanceIndicator() {
    this.perfomanceIndicatorService.addPerformanceIndicator(this.performanceIndicator).subscribe((data: any) => {
      
      // this.getAllPerformanceIndicator();
      this.performanceIndicator = new PerformanceIndicator();
      this.performanceIndicator.designation = new Designation();
      this.getAllPerformanceIndicator();
    }, err => {
      console.log(err)
    });

  }


  // getting all perfomance
  getAllPerformanceIndicator() {
    this.perfomanceIndicatorService.getAllPerformanceIndicator(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.performanceIndicators = data.content;

      this.length = data.totalElements;
    })
  }
  updatePerformanceIndicatorStatus(id: number, status: string) {

    this.perfomanceIndicatorService.updatePerformanceIndicatorStatus(status, id).subscribe((data: any) => {
      this.getAllPerformanceIndicator();
    }); 
  }
  // setting data in edit form
  setEditData(id: number) {
    this.perfomanceIndicatorService.getPerformanceIndicatorById(id).subscribe((data: any) => {

      this.performanceIndicator = data;
      //this.getAllDesignations();

    });
  }






  // updating data
  updatePerformanceIndicator() {
    this.perfomanceIndicatorService.updatePerformanceIndicator(this.performanceIndicator).subscribe((data: any) => {
this.performanceIndicator=new PerformanceIndicator();

      this.getAllPerformanceIndicator();
    })
  }



  // searching the user
  filter() {
    
    
    if ((!this.searching || !this.searching.designation.id || this.searching.designation.id== 0) 
   
    )
     {
      return;
     }

    this.perfomanceIndicatorService.searchPerformanceIndicator(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.performanceIndicators = data.content;
    
      
    })
  }

  // setting id for delete
  confirm(id: number) {
    this.performanceIndicator.id = id;
  }

  // delete employee
  deletePerformanceIndicator() {
    this.perfomanceIndicatorService.deletePerformanceIndicator(this.performanceIndicator.id).subscribe((data: any) => {
      this.getAllPerformanceIndicator();
    })
  }


  // pagination

  length = 50;
  pageSize = 10;
  pageIndex = 0;
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
    this.getAllPerformanceIndicator();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }



}


