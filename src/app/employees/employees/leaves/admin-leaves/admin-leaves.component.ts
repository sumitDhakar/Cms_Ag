import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LeaveApplications } from 'src/app/entites/leave-applications';
import { LeaveStatics } from 'src/app/entites/leave-statics';
import { LeaveType } from 'src/app/entites/leave-type';
import { Permissions } from 'src/app/entites/permissions';
import { LeaveApplicationService } from 'src/app/services/admin/adminLeave-application.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeLeaveTypesService } from 'src/app/services/employee/employee-leave-types.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-leaves',
  templateUrl: './admin-leaves.component.html',
  styleUrls: ['./admin-leaves.component.scss']
})
export class AdminLeavesComponent implements OnInit {

  constructor(private leaveService: LeaveApplicationService,
    private employeeLeaveTypeService: EmployeeLeaveTypesService, private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.getAllLeaveApplications();
    this.getLeaveTypes()
    this.getLeaveStatics();
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
  imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/';

  statuses = [
    {
      style: 'fa fa-dot-circle-o text-purple',
      status: 'New'
    },
    {
      style: 'fa fa-dot-circle-o text-info',
      status: 'Pending'
    },
    {
      style: 'fa fa-dot-circle-o text-danger',
      status: 'Declined'
    },
    {
      style: 'fa fa-dot-circle-o text-success',
      status: 'Approved'
    },
  ]

  status = 'Pending';
  search: LeaveApplications = new LeaveApplications();
  leaveTypes: LeaveType[] = [];

  leaveApplication: LeaveApplications = new LeaveApplications();
  leaveApplications: LeaveApplications[] = [];
  leaveStatics!: LeaveStatics;


  getLeaveStatics() {
    this.leaveService.getLeaveApplicatonStatics().subscribe((data: any) => {
      this.leaveStatics = data;
    })
  }

  // get all leave applications
  getAllLeaveApplications() {
    this.leaveService.getAllLeaves(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.leaveApplications = data.content;
      this.length = data.totalElements;
    })
  }

  // get all leave types
  getLeaveTypes() {
    this.employeeLeaveTypeService.getAllLeaveTypes().subscribe((data: any) => {
      this.leaveTypes = data;
    })
  }


  setStatus(status: string, id: number) {
    if (status !== "Approved") {
      this.leaveService.updateLeaveStatus(status, id).subscribe((data: any) => {
        this.getAllLeaveApplications();
      })
    }
    else {
      this.status = status;
      this.leaveApplication.id = id;
    }

  }

  // update leave application status
  updateStatus() {
    if (this.status == 'Approved')
      this.leaveService.updateLeaveStatus(this.status, this.leaveApplication.id).subscribe((data: any) => {

        this.getAllLeaveApplications();
      })

  }

  confirm(id: number) {
    this.leaveApplication.id = id;
  }

  // delete leave application
  deleteLeave() {
    this.leaveService.deleteLeaveApplicationById(this.leaveApplication.id).subscribe((data: any) => {
      this.getAllLeaveApplications();
    })
  }

  // search leave applications
  searching() {

    if ((!this.search || !this.search.status || this.search.status.trim() === '') &&
    (!this.search|| !this.search.applicantId.firstName || this.search.applicantId.firstName.trim() === '')&&
    (!this.search|| !this.search.leaveTypeId.id|| this.search.leaveTypeId.id === 0)&&
    (!this.search || !this.search.startDate || this.search.startDate.trim() === '')&&
    (!this.search || !this.search.endDate || this.search.endDate.trim() === ''))
    
     {
  return;
    }
    this.leaveService.searchEmployee(this.pageIndex, this.pageSize, this.search).subscribe((data: any) => {
      this.leaveApplications = data.content;
      this.length = data.totalElements;
    

    })
  }



  // pagination

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5, 10];

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
    this.getAllLeaveApplications();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

}
