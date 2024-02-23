import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { OverTime } from 'src/app/entites/over-time';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';

import { OvertimeService } from 'src/app/services/overtime.service';
import { Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { OverTimeRequest } from 'src/app/payload/over-time-request';
import { ImageUtil } from 'src/app/payload/image-util';
import { Component, OnInit } from '@angular/core';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss']
})
export class OvertimeComponent implements OnInit {

  overTime: OverTime = new OverTime();
  overTimeEmployee: OverTimeRequest = new OverTimeRequest();
  employees: UserListResponse[] = [];
  // admins: UserListResponse[] = [];
  overtimeData: OverTime[] = [];
  totalOverTime: any;
  myForm: FormGroup;

  constructor(private overtimeService: OvertimeService
    , private fb: FormBuilder,
    private sweetAlertMessages: SweetAlertMessagesProvidersService
    , private usersService: AdminUsersService, private authService: AuthService, private location: Location) {


    this.myForm = this.fb.group({
      description: ["", [Validators.required, Validators.minLength(10)]],
      overTimeDate: ["", [Validators.required]],
      overTimeHours: ["", [Validators.required]],
      overTimeType: ["", [Validators.required]],
      approvedBy: ["", [Validators.required]],
      userId: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
    this.overTime.approvedBy = new Users();
    this.overTime.userId = new Users();
  }

addForm(){
  this.myForm.reset();

}
  ngOnInit(): void {
    this.getAllOverTime();
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


  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();



  updateOverTimeByStatus(id: number, status: string) {
    this.overtimeService.getOverTimeByStatus(status, id).subscribe((data: any) => {
      this.getAllOverTime();
      this.sweetAlertMessages.alertMessage('success', 'OverTime Status Updated successfully.')

    });
  }
 sequence:any=0;
 
  
  getAllOverTime() {
    this.overtimeService.getAllOverTime(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.getTotal();
      this.overtimeData = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  getTotal() {
    this.overtimeService.getTotalWorkingHours().subscribe((data: any) => {
      this.totalOverTime = data.summary;
    })
  }




  // adding overTime
  addOverTime() {

    this.overtimeService.addOverTime(this.overTimeEmployee).subscribe((data: any) => {
      this.getAllOverTime();
      this.overTimeEmployee = new OverTimeRequest();

      this.overTime = new OverTime();
      this.overTime.userId = new Users();
      this.overTime.approvedBy = new Users();
      this.myForm.reset();
      this.sweetAlertMessages.alertMessage('success', 'OverTime  Added successfully.')
      AppUtils.modelDismiss('add');

    }, err => {
          this.sweetAlertMessages.alertMessage('error', err.error.message)

    });



  }


 

  // setting data in edit form
  setEditData(id: number) {
    this.overtimeService.getOverTimeById(id).subscribe((data: any) => {

      this.overTime.approvedBy = new Users();
      this.overTime.userId = new Users();
      this.overTimeEmployee = data;
      this.overTime.approvedBy = data.approvedBy
      this.overTime.userId = data.userId
      this.overTime = data;
    });
  }

  // updating overTime data
  updateOverTime() {
    this.overTimeEmployee.approvedBy = this.overTime.approvedBy.id;
    this.overTimeEmployee.userId = this.overTime.userId.id;

    this.overtimeService.updateOverTime(this.overTimeEmployee).subscribe((data: any) => {
      this.overTimeEmployee = new OverTimeRequest();
      this.overTime = new OverTime();
      this.overTime.approvedBy = new Users();
      this.overTime.userId = new Users();
      this.getAllOverTime();
      this.myForm.reset();
      this.sweetAlertMessages.alertMessage('success', 'OverTime  Updated successfully.')

    }, err => {
      console.log(err);
    });


  }



  deleteId = 0;
  // setting id for delete
  confirm(id: number) {
    // this.overTime.id = id;
    this.deleteId = id;
  }

  // delete overTime
  deleteOverTime() {
    this.overtimeService.deleteOverTimeById(this.deleteId).subscribe((data: any) => {
      this.getAllOverTime();
      this.sweetAlertMessages.alertMessage('success', 'OverTime  Deleted successfully.')

    })
  }


  // pagination

  length = 50;
  pageSize = 10;
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
    this.getAllOverTime();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }


}


