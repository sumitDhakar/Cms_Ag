import { Component, OnInit } from '@angular/core';
import { EmployeesDashboard } from 'src/app/entites/employees-dashboard';
import { Holidays } from 'src/app/entites/holidays';
import { Users } from 'src/app/entites/users';
import { ImageUtil } from 'src/app/payload/image-util';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeDashboardServiceService } from 'src/app/services/employee/employee-dashboard-service.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private dashboardService: EmployeeDashboardServiceService
    , private authService: AuthService) { }

  dashBoard: EmployeesDashboard = new EmployeesDashboard();
  Hoildayes: Holidays = new Holidays();
  presentDate: Date = new Date();
  ngOnInit(): void {
    this.getDetails();
    this.setUserDetais();
    this.setBaseUrl();
    this.removeSidebarClass();
  }
  baseRoute = 'employee-dash'


  setBaseUrl() {
    this.baseRoute = this.authService.getUrl();
  }

  employee:Users=new  Users();
  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();
  getDetails() {
    this.dashboardService.getEmployeeDetails().subscribe((data: any) => {
      this.dashBoard = data;
      this.presentDate = new Date();
    });
  }



  setUserDetais(){
    this.employee= this.authService.getUser();
 }

 removeSidebarClass(){
  let element = document.getElementById("sidebar");
  element?.classList.add('opened');
  
}


}