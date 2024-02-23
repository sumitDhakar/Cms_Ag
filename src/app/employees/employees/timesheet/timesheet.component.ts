import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { Tasks } from 'src/app/entites/tasks';
import { TimeSheets } from 'src/app/entites/time-sheets';
import { Users } from 'src/app/entites/users';
import { FileSizePipe } from 'src/app/materials/utils/FileSizePipe';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { ImageUtil } from 'src/app/payload/image-util';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AdminTasksService } from 'src/app/services/admin/admin-tasks.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimeSheetsService } from 'src/app/services/time-sheets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  providers: [FileSizePipe, DatePipe],

})
export class TimesheetComponent implements OnInit {

  timeSheet: TimeSheets = new TimeSheets();
  timeSheets: TimeSheets[] = [];

  date = new Date
  todayDate = this.date.toISOString().slice(0, 10)//this.datePipe.transform(new Date(),"yyyy-MM-dd")

  project: Projects = new Projects();

  projects: Projects[] = [];

  ngOnInit(): void {
    this.getAllTimeSheet()
    this.getAllProjects();
    this.setPermissions();
    this.setBaseUrl();
  }

  baseRoute = 'employee-dash'

  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();

  permissions: Permissions = new Permissions();
  setPermissions() {
    this.authService.isUserPermitted(this.location.path(), false).then(data => {
      if (data == null)
        this.authService.navigate(this.baseRoute);
      this.permissions = data;
    })
  }
  addForm() {
    this.myForm.reset();
  }

  myForm: FormGroup;



  constructor(private builder: FormBuilder, private projectService: AdminProjectService
    , private taskService: AdminTasksService, private timeSheetsService: TimeSheetsService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService, private location: Location) {
    this.myForm = this.builder.group({
      assignedHour: new FormControl('', [Validators.required,]),
      // workedHours: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      remaningHours: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      projectId: new FormControl('', [Validators.required]),
      taskId: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      timeSheetDate: new FormControl('', [Validators.required])
    }),
      this.timeSheet.projectId = new Projects();
    this.timeSheet.taskId = new Tasks();
  }




  async onProjectSelect(inp: any) {
    this.projectService.getProjectById(inp.value).subscribe((data: any) => {
      this.project = data;
      this.timeSheet.projectId.id = this.project.id;
      this.getAllTaskByProjectId(inp.value);
    })
  }

  task: Tasks = new Tasks();
  onTaskSelect(inp: any) {
    this.taskService.getTaskById(inp.value).subscribe((data: any) => {
      this.task = data;
      this.timeSheet.taskId = this.task;
      this.timeSheet.assignedHour = this.task.assignedHours;


    })
  }

  getDate(event: any) {
    console.log(event);

  }

  addTimeSheets() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {

      return;
    }
    this.timeSheetsService.addTimeSheets(this.timeSheet).subscribe((data: any) => {
      this.timeSheet = new TimeSheets();
      this.timeSheet.projectId = new Projects();
      this.timeSheet.taskId = new Tasks();
      this.sweetAlertMessages.alertMessage('success', 'Your TimeSheet  Added successfully.')
      AppUtils.modelDismiss('add');
      this.getAllTimeSheet();

    }, (err: any) => {
      this.sweetAlertMessages.alertMessage('error', err.error.message)
    });
  }

  getAllTimeSheet() {
    this.timeSheetsService.getAllTimeSheets(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.timeSheets = data.content;
      this.length=data.totalElements;
    })
  }
   id=0;
  async getAllProjects() {
    this.authService.loggedInUser.subscribe((data:any)=>{
             this.id=data.id;
    })
      this.projectService.getProjectByUsersId(0, 10000, this.id).subscribe((data: any) => {
        this.projects = data.content;
      });
  }


  tasksList: Tasks[] = []
  getAllTaskByProjectId(id: number) {
    this.taskService.getAllTasksByProjectId(0, 10000, id).subscribe((data: any) => {
      this.tasksList = data.content;
    })
  }



  getProjectsDetails() {
    this.projectService.getAllProjects().subscribe((data: any) => {
      this.project = data;
    });
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
    this.getAllTimeSheet();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }




  setEditData(id: number) {
    this.timeSheetsService.getTimeSheetsById(id).subscribe((data: any) => {
      this.timeSheet = data;
    })
  }

  updateTimeSheet() {
    this.timeSheetsService.updateTimeSheets(this.timeSheet).subscribe((data: any) => {
      this.timeSheet = new TimeSheets();
      this.getAllTimeSheet();
    }, (err: any) => {
        this.sweetAlertMessages.alertMessage('error', err.error.message)
      });
  }

  confirm(id: number) {
    this.timeSheet.id = id;
  }

  deleteTimeSheet(id:any) {
    Swal.fire({
      title: " Delete  Task?",
      text: "Do you want to Delete the task?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.timeSheetsService.deleteTimeSheets(id).subscribe((data: any) => {
          this.getAllTimeSheet();
          this.sweetAlertMessages.alertMessage('success', "TimeSheet deleted Succesfully");
        }, err => {
          this.sweetAlertMessages.alertMessage('error',  err.error.message);
        });

      }
    });
  }

}
