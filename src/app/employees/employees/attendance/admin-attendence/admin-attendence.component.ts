import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminAttendanceSearch } from 'src/app/entites/admin-attendance-search';
import { Attendance } from 'src/app/entites/attendance';
import { Permissions } from 'src/app/entites/permissions';
import { UserAttendance } from 'src/app/entites/user-attendance';
import { TimeConvert } from 'src/app/materials/utils/TimeConvert';
import { AdminAttendanceService } from 'src/app/services/admin/admin-attendance.service';
import { AuthService } from 'src/app/services/auth.service';
import { AttendanceService } from 'src/app/services/employee/attendance.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-attendence',
  templateUrl: './admin-attendence.component.html',
  styleUrls: ['./admin-attendence.component.scss'],
  providers: [DatePipe, TimeConvert]
})
export class AdminAttendenceComponent implements OnInit {
  constructor(private adminAttendanceService: AdminAttendanceService,
     private employeeAttendanceService: AttendanceService,
      private convert: TimeConvert
    ,private authService:AuthService,
    private location:Location) { }

  years: any = [];

  search: AdminAttendanceSearch = new AdminAttendanceSearch();

  ngOnInit(): void {
    //  this.getAttendance()
    this.getYears();
    this.getAllAttendance();
    this.setPermissions();
    this.setBaseUrl();
    }
  
    baseRoute='employee-dash'
    
    setBaseUrl(){
      this.baseRoute = this.authService.getUrl();
    }
    
      permissions:Permissions=new Permissions();
      setPermissions(){
        this.authService.isUserPermitted(this.location.path(),false).then(data=>{
          if(data==null)
          this.authService.navigate(this.baseRoute);
             this.permissions =  data;
        }) 
      }
    imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';


  userAttendances: UserAttendance[] = [];
  attendances: Attendance[] = [];
  users: any = {};
  details: Attendance[] = [];
  getAllAttendance() {
    this.adminAttendanceService.getAttendance(this.pageIndex, this.pageSize).subscribe((data: any) => {
      console.log(data);
      this.userAttendances = data.content[0];
      console.log(this.userAttendances);

    })
  }

  getYears() {
    let endDate = new Date().getFullYear();
    let startDate = 2000;
    for (let year = endDate; year >= startDate; year--) {
      this.years.push(year);
    }
  }

  searchAttendance() {
     
    this.adminAttendanceService.searchAttendance(this.pageIndex, this.pageSize, this.search).subscribe((data: any) => {
      console.log(data);
      this.userAttendances = data.content[0];

    })
  }

  // paginatio

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
    this.getAllAttendance();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }


  getDetails(id: any, day: string) {

    this.employeeAttendanceService.getAllAttendanceOfDateByUserId(day, id).subscribe((data: any) => {
      this.details = data;
      this.details[0].lastOut = this.details[this.details.length - 1].outTime;
      console.log(data);
      //  this.caculateTime();

      this.employeeAttendanceService.getFirstInTimeByUserId(day, id).subscribe((data: any) => {
        console.log(data);
        this.details[0].firstIn = data.inTime;

      })
    })






    // this.employeeAttendanceService.getLastOutTimeByUserId(day,id).subscribe((data:any)=>{
    //     this.details[0].lastOut = data.outTime;
    //     console.log(data.outTime+"-----out Time");
    // });

  }


  duration = 0;
  hours: any;
  minutes: any;
  seconds: any;

  async caculateTime() {
    this.duration = 0;
    this.details.forEach((a) => {
      if (a.outTime == null)
        this.duration += new Date().getTime() - new Date(a.inTime).getTime();
      else
        this.duration += new Date(a.outTime).getTime() - new Date(a.inTime).getTime();

    })
    let time = this.convert.converTime(this.duration);
    this.hours = time.slice(0, 2);
    this.minutes = time.slice(3, 5);
    this.seconds = time.slice(6, 8);
  }



  isPresent(id: number, date: string): boolean {
    this.attendances = this.users[id];
    for (let j = 0; j < this.attendances.length; j++) {
      if (this.attendances[j].inTime.includes(date))
        return true;
    }
    return false;

  }

}