import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { LeaveApplications } from 'src/app/entites/leave-applications';
import { LeaveType } from 'src/app/entites/leave-type';
import { EmployeeLeaveApplicationService } from 'src/app/services/employee/employeeLeave-application.service';
import { LeaveTypesService } from 'src/app/services/admin/leave-types.service';
import { EmployeeLeaveTypesService } from 'src/app/services/employee/employee-leave-types.service';
import { EmployeeLeaveStatics } from 'src/app/entites/employee-leave-statics';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe, Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { ImageUtil } from 'src/app/payload/image-util';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss'],
  providers:[DatePipe]
})
export class EmployeeLeavesComponent implements OnInit {
  todayDate = this.datePipe.transform(new Date(),"yyyy-MM-"+(new Date().getDate()+1).toString())
 
  check = "halfDay";
  // myForm: FormGroup;
  ngOnInit(): void {
    this.getLeaveTypes();
    this.getAllLeavesByApplicantId();
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


  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();


  constructor(private leaveService: EmployeeLeaveApplicationService, private datePipe:DatePipe,private webSocketService:WebSocketService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private employeeLeaveTypeService: EmployeeLeaveTypesService,
     private fb: FormBuilder, private authService: AuthService, private location: Location) {
    // this.myForm = this.fb.group({
    //   leaveTypeId: ["", [Validators.required]],
    //   check: ["", [Validators.required]],
    //   startDate: ["", [Validators.required]],
    //   totalHours: ["", [Validators.required]],
    //   endDate: ["", [Validators.required]],
    //   reason: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
    // });

  }





  leaveTypes: LeaveType[] = [];
  emloyeeLeaveStatics!: EmployeeLeaveStatics;
  leaveApplication: LeaveApplications = new LeaveApplications();
  leaveApplications: LeaveApplications[] = []

  getLeaveTypes() {
    this.employeeLeaveTypeService.getAllLeaveTypeActive().subscribe((data: any) => {
      this.leaveTypes = data;
    })
  }


  createApplication() {

    if (this.check != 'multiple'){
      this.leaveApplication.endDate = this.leaveApplication.startDate;
      this.leaveApplication.totalHours=4;
    }
    // if (this.myForm.valid)
      this.leaveService.createLeave(this.leaveApplication).subscribe((data: any) => {
        this.sweetAlertMessages.alertMessage('success', 'Leave Added successfully.')
        this.getAllLeavesByApplicantId();
      },
      (err) => {
       
        if(err.error.status==302)
        this.sweetAlertMessages.alertMessage('error', 'You Have already Taken leave for this date.')
        
       else if(err.error.status == 409)
        this.sweetAlertMessages.alertMessage('error', err.error.message)
        else
        this.sweetAlertMessages.alertMessage('error', err.error.status)
      })

  }

  getAllLeavesByApplicantId() {
    this.leaveService.getLeavesByApplicantId(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.leaveApplications = data.content;
      this.length = data.totalElements;

    })
  }

  getLeaveStatics() {
    this.leaveService.getLeaveStatics().subscribe((data: any) => {
      this.emloyeeLeaveStatics = data;
    })
  }


  setEditData(id: number) {

    this.leaveService.getLeaveById(id).subscribe((data: any) => {
      this.leaveApplication = data;
    })
  }

  updateLeaveApplication() {

    this.leaveService.updateLeave(this.leaveApplication).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success', 'Leave Update successfully.')

      this.getAllLeavesByApplicantId();
    })
  }

  confirm(id: number) {
    this.leaveApplication.id = id;
  }

  deleteLeave() {
    this.leaveService.deleteLeaveApplicationById(this.leaveApplication.id).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success', 'Your Leave Deleted successfully.')

      this.getAllLeavesByApplicantId();
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
    this.getAllLeavesByApplicantId();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput)
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);


  }


  
}
