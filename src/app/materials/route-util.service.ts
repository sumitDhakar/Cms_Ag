import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardComponent } from '../main/dashboard/adminDashboard/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from '../home/home/home.component';
import { AdminGuard } from './guards/admin.guard';
import { childrens } from './custome-routing/custome-routing.module';
import { AuthService } from '../services/auth.service';
import { EmployeeDashboardComponent } from '../main/dashboard/employeeDashboard/employee-dashboard/employee-dashboard.component';
import { EmployeeHomeComponent } from '../home/Employee/employee-home/employee-home.component';
import { Error404Component } from '../pages/error-pages/error404/error404.component';
import { CanDeactivateGuard } from './guards/chat-deactive.guard';

@Injectable({
  providedIn: 'root'
})
export class RouteUtilService {

  constructor(private router: Router, private authService: AuthService) { }


  openUserDashboard() {
    if (this.authService.getUserRoles()?.includes("ADMIN")) {
      this.setRoutes();
      this.router.navigate(['dollop']);
    }
    else {
      this.setRoutes();
      this.router.navigate(['employee-dash']);
    }
  }

  setRoutes() {
    if (this.authService.getUserRoles()?.includes("ADMIN")) {
      childrens.unshift({
        path: '', component: AdminDashboardComponent
      },)
      this.router.config.push({
        path: 'dollop', component: HomeComponent, canActivate: [AdminGuard],  canDeactivate: [CanDeactivateGuard],
        children: childrens,
      },)
     console.log(this.router.config);
     
    }
    else {
      childrens.unshift({
        path: '', component: EmployeeDashboardComponent
      },)
      this.router.config.push({
        path: 'employee-dash', component: EmployeeHomeComponent,canActivate:[AdminGuard],  canDeactivate: [CanDeactivateGuard]
        , children: childrens
      },)
    
    }
  }

  setWildRoute(){
    this.router.config.push({
      path: "**", component: Error404Component
    })
  }
}
