import { NumberInput } from '@angular/cdk/coercion';
import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Attendance } from 'src/app/entites/attendance';
import { AttendanceStatics } from 'src/app/entites/attendance-statics';
import { Permissions } from 'src/app/entites/permissions';
import { Users } from 'src/app/entites/users';
import { TimeConvert } from 'src/app/materials/utils/TimeConvert';
import { AuthService } from 'src/app/services/auth.service';
import { AttendanceService } from 'src/app/services/employee/attendance.service';

@Component({
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.scss'],
  providers: [DatePipe, TimeConvert]
})
export class EmployeeAttendenceComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  constructor(private employeeAttendanceService: AttendanceService, private datepipe: DatePipe, private convert: TimeConvert,
    private authService:AuthService,private location:Location) { }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getLatestAttendanceByUserId();
    this.getFirstInByUserId();
    this.getAllAttendanceOfDateByUserId();
    this.getAttendanceHistory();
    this.getAttendanceStaticsOfUser();
    this.setPermissions();
    this.setBaseUrl();
 this.getYears();
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
   

  attendanceStatic: Attendance = new Attendance();
  attendance: Attendance = new Attendance();
  history: Attendance[] = [];
  statics!: AttendanceStatics;
  attendances: Attendance[] = [];
  punchedIn = false;
  todayDate = '';
  dateTemp = '';
  user!: Users;
  temp = '';
  search: Attendance = new Attendance();


  // get logged in user
  getLoggedIn() {

    this.attendance.userId = this.user;
    this.search.userId = this.user;
    this.attendanceStatic.userId = this.user;
  }

  // punching in
  punch() {
    if (!this.punchedIn) {
      this.punchedIn = true;
      this.addAttendance();
      this.timer();
    }
    else {
      this.punchedIn = false;
      this.updateAttedance();
clearInterval(this.time);
    }
    this.getAttendanceStaticsOfUser()
  }

  // adding attendance
  addAttendance() {

    if (this.attendance == null) {
      this.attendance = new Attendance();
    }

    this.attendance.userId = this.authService.getUser();

    this.employeeAttendanceService.addAttendance(this.attendance).subscribe((data: any) => {
      this.attendance = data;
      this.getLatestAttendanceByUserId();
      this.getFirstInByUserId();
      this.getAllAttendanceOfDateByUserId();
      this.getAttendanceHistory();
    })
  }

  // update attendance
  updateAttedance() {
    this.attendance.userId = this.authService.getUser();
    this.employeeAttendanceService.updateAttendance(this.attendance).subscribe((data: any) => {
      this.attendance = new Attendance();
      this.getLatestAttendanceByUserId();
      this.getAllAttendanceOfDateByUserId();
      this.getAttendanceHistory();
    })

  }

  // first in attendance of User According to date
  getFirstInByUserId() {

    this.todayDate = this.datepipe.transform(new Date(), "yyyy-MM-dd") || '';

    this.employeeAttendanceService.getFirstInTimeByUserId(this.todayDate, this.user.id).subscribe((data: any) => {
      if (data != null)
        this.attendanceStatic.inTime = data.inTime;

    })
    this.getLastOutByUserId();
  }

  // last out from attendance of User according to date
  getLastOutByUserId() {

    this.todayDate = this.datepipe.transform(new Date(), "yyyy-MM-dd") || '';
    this.employeeAttendanceService.getLastOutTimeByUserId(this.todayDate, this.user.id).subscribe((data: any) => {


    })
  }

  // get latest attendance entry of user by id
  async getLatestAttendanceByUserId() {
    await this.getLoggedIn();


    this.employeeAttendanceService.getLatestAttendanceByUserId(this.user.id).subscribe((data: any) => {
      this.attendance = data;

      if (this.attendance && this.attendance.inTime != null) {
        // this.todayDate = this.datepipe.transform(new Date(), "yyyy-MM-dd") || '';
        // if(this.datepipe.transform(this.attendance.inTime,"yyyy-MM-dd")==this.todayDate)
        this.punchedIn = true;
      }
clearInterval(this.time);
      this.timer();
      this.caculateTime();
    });
  }



  // get all attendance of user by given date
  getAllAttendanceOfDateByUserId() {

    this.dateTemp = this.datepipe.transform(new Date(), "yyyy-MM-dd") || '';
    this.employeeAttendanceService.getAllAttendanceOfDateByUserId(this.dateTemp, this.user.id).subscribe((data: any) => {
      this.attendances = data;
      this.caculateTime();
      this.dateTemp = '';
    });
  }

  // get attendance history of User by User Id
  getAttendanceHistory() {

    this.employeeAttendanceService.getAttendanceHistoryOfUserByUserId(this.pageIndex, this.pageSize, this.user.id).subscribe((data: any) => {
      this.history = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
      this.history.forEach(a => {
        a.totalTime = new Date(a.outTime).getTime() - new Date(a.inTime).getTime();
        if (a.totalTime <= 0)
          a.totalTime = "--";
        else {
          a.totalTime = this.converTime(a.totalTime);
          a.totalTime = a.totalTime.slice(0, 2) + "." + a.totalTime.slice(3, 5);
        }
        console.log('totalTime' + a.totalTime);

      })
      console.log(data);

    })
  }

  searching() {

    if (this.search.inTime != undefined && this.search.inTime != null && this.search.inTime != '') {
      this.getSearchHistory();
    }
    else {
      this.search.inTime = this.temp + "-" + (this.dateTemp!=""?this.dateTemp+"-":this.dateTemp);

      this.getSearchHistory();

    }
  }

  getSearchHistory() {
    this.employeeAttendanceService.searchAttendance(this.pageIndex, this.pageSize, this.search.inTime, this.user.id).subscribe((data: any) => {
      this.history = data.content;
      console.log(data.content);
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
      this.length = data.totalElements;
    })
    this.search.inTime = null;
  }


  getAttendanceStaticsOfUser() {

    this.employeeAttendanceService.getAttendanceStaticsOfUser().subscribe((data: any) => {
      console.log(data);

      this.statics = data;
    })
  }



  // paginatio

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];
  sequence=0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  timeInterval:any

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAttendanceHistory();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  // timer 
  duration: any = 0;
  hours: any;
  minutes: any;
  seconds: any = -0;
  mili: any = 0;


time:any;
  timer() {
    this.caculateTime();
    if (this.punchedIn) {
      this.time = setInterval(() => {

        if (!this.punchedIn)
          clearInterval(this.time);
        this.seconds++;
        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
        }
        if (this.minutes >= 60) {
         this.minutes =  0;
          this.hours++;
        }
      
      }, 1000)
    }
  }


  async caculateTime() {
    this.duration = 0;
    this.attendances.forEach((a) => {
      if (a.outTime == null)
        this.duration += new Date().getTime() - new Date(a.inTime).getTime();
      else
        this.duration += new Date(a.outTime).getTime() - new Date(a.inTime).getTime();

    })
    let time = this.convert.converTime(this.duration);
    this.hours = Number.parseInt(time.slice(0, 2));
    this.minutes =  Number.parseInt(time.slice(3, 5));
    this.seconds = Number.parseInt(time.slice(6,8));
    
  }


  converTime(duration: number) {

    let minut: any, hour, second;
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hour = (hours < 10) ? "0" + hours : hours;
    minut = (minutes < 10) ? "0" + minutes : minutes;
    second = (seconds < 10) ? "0" + seconds : seconds;

    return hour + "." + minut + "." + second;
  }
 

  breakTime:any="";


  break(){
    let totalDuration = new Date().getTime() - new Date(this.attendanceStatic.inTime).getTime();
    console.log(this.converTime(totalDuration));
         
  }

  public years:number[] = [];
  public getYears(){
    for(let i = 2000;i<=new Date().getFullYear();i++){
      this.years.push(i);
    }
  }

}
