import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

import { GoalType,  } from 'src/app/entites/goal-type';
import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { GoalTypeService } from 'src/app/services/goal-type.service';

@Component({
  selector: 'app-goal-type',
  templateUrl: './goal-type.component.html',
  styleUrls: ['./goal-type.component.scss']
})
export class GoalTypeComponent implements OnInit {
  departmentservice: any;
  department: any;
  isListView: any;
  myForm: FormGroup;
  departments: any;
  constructor(
    private goalTypeService: GoalTypeService,
    private authService: AuthService, private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private location: Location
  ) {this.myForm =new FormGroup({
     goalType : new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/),Validators.minLength(2),Validators.maxLength(25)]),
     description : new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(150)]),
 
    })
    }
  ngOnInit(): void {
    this.getAllGoalType();
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


  deleteId = 0;
  searching: GoalType = new GoalType();

  sequence:any=0;


  goalType: GoalType = new GoalType();
  goalTypeList: GoalType[] = [];
  addGoalType() {
    this.goalTypeService.addGoalType(this.goalType).subscribe((data: any) => {
      this.goalType = new GoalType();
      this.getAllGoalType();
      this.sweetAlertMessages.alertMessage('success', 'Goal-Type Added successfully.')
    }, err => {
      console.log(err)
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    });
  }


  getAllGoalType() {
    this.goalTypeService.getAllGoalType(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.goalTypeList = data.content;

      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
   
    })
  }

  setEditData(id: number) {
    this.goalTypeService.getGoalTypeByID(id).subscribe((data: any) => {
      this.goalType = data;
    });

  }

  updateGoalType() {
    this.goalTypeService.updateGoalType(this.goalType).subscribe((data: any) => {
      this.getAllGoalType();
      this.sweetAlertMessages.alertMessage('success', 'Goal-Type Updated successfully.')

    },err=>{
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    })
  }


  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }


  filter() {
    if ((!this.searching || !this.searching.goalType || this.searching.goalType.trim()=== '')
    
    )
     {
      return;
     }

    this.goalTypeService.searchGoalType(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.goalTypeList = data.content;
    })
  }
  setDeleteGoalType(id: number) {
    this.deleteId = id;
  }

  deleteDepartment() {
    
    this.goalTypeService.deleteGoalType(this.deleteId).subscribe((data: any) => {
      this.getAllGoalType();    
        this.sweetAlertMessages.alertMessage('success', 'Goal-Type Deleted successfully.')

    },err=>{
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    })
  }

  // pagination

  length = 50;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5, 10];
  pageNo = 0;
  pageSize = 10;
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
    this.getAllGoalType();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  updateGoalTypeStatus(id: number, status: string) {
    this.goalTypeService.getGoalTypeByStatus(status, id).subscribe((data: any) => {
      this.getAllGoalType();
      this.sweetAlertMessages.alertMessage('success', 'Goal-Type Status Changed successfully.')

    },err=>{
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    });
  }

}



