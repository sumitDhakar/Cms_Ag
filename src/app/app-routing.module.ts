import { NgModule, OnInit } from '@angular/core';
import { ROUTES, Router, RouterModule, Routes } from '@angular/router';
import { BasicDetailsComponent } from './authentication/basic-details/basic-details.component';
import { childrens } from './materials/custome-routing/custome-routing.module';
import { ActivitesComponent } from './administration/activities/activites/activites.component';
import { AssetsComponent } from './administration/assets/assets/assets.component';
import { JobApplicantsComponent } from './administration/jobs/job-applicants/job-applicants.component';
import { JobDetailsComponent } from './administration/jobs/job-details/job-details.component';
import { JobListComponent } from './administration/jobs/job-list/job-list.component';
import { JobViewComponent } from './administration/jobs/job-view/job-view.component';
import { ManageJobsComponent } from './administration/jobs/manage-jobs/manage-jobs.component';
import { KnowledgeBaseViewComponent } from './administration/knowledgeBase/knowledge-base-view/knowledge-base-view.component';
import { KnowledgeBaseComponent } from './administration/knowledgeBase/knowledge-base/knowledge-base.component';
import { ChangePasswordComponent } from './administration/settings/change-password/change-password.component';
import { CompanySettingsComponent } from './administration/settings/company-settings/company-settings.component';
import { EmailSettingsComponent } from './administration/settings/email-settings/email-settings.component';
import { InvoiceSettingsComponent } from './administration/settings/invoice-settings/invoice-settings.component';
import { LeaveTypeComponent } from './administration/settings/leave-type/leave-type.component';
import { LocalizationComponent } from './administration/settings/localization/localization.component';
import { NotificationsComponent } from './administration/settings/notifications/notifications.component';
import { RolesAndPermissionsComponent } from './administration/settings/roles-and-permissions/roles-and-permissions.component';
import { ThemeSettingsComponent } from './administration/settings/theme-settings/theme-settings.component';
import { UsersComponent } from './administration/users/users/users.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { EmployeeListComponent } from './employees/employees/allEmployee/employee-list/employee-list.component';
import { EmployeeAttendenceComponent } from './employees/employees/attendance/employee-attendence/employee-attendence.component';
import { OvertimeComponent } from './employees/employees/overtime/overtime.component';
import { TimesheetComponent } from './employees/employees/timesheet/timesheet.component';
import { ProjectsComponent } from './employees/projects/projects/projects.component';
import { TasksComponent } from './employees/projects/tasks/tasks.component';
import { TicketTypeComponent } from './employees/tickets/ticket-type/ticket-type.component';
import { TicketsComponent } from './employees/tickets/tickets/tickets.component';
import { EmployeeHomeComponent } from './home/Employee/employee-home/employee-home.component';
import { HomeComponent } from './home/home/home.component';
import { SalaryComponent } from './hr/payroll/salary/salary.component';
import { EmployeeDashboardComponent } from './main/dashboard/employeeDashboard/employee-dashboard/employee-dashboard.component';
import { AdminGuard } from './materials/guards/admin.guard';
import { EmployeeGuard } from './materials/guards/employee.guard';
import { Error404Component } from './pages/error-pages/error404/error404.component';
import { ForgetVerificationComponent } from './authentication/forget-password/forget-verification/forget-verification.component';



const route: Routes = [
  {
    path: "", component: LoginComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "otpVerification", component: OtpVerificationComponent
  },
  {
    path: "basicDetail", component: BasicDetailsComponent
  },
  {
    path: "forget-Password", component: ForgetPasswordComponent
  },
  {
    path: "forget", component: ForgetVerificationComponent
  },
  {
    path:"apply/job",component:JobListComponent
  },
  {
    path:"apply/job/:id",component:JobViewComponent
  }

]

const routes: Routes = [
  {
    path: "", component: RegistrationComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "otpVerification", component: OtpVerificationComponent
  },
  {
    path: "basicDetail", component: BasicDetailsComponent
  },
  {
    path: "forget-Password", component: ForgetPasswordComponent
  },
  {

    path: 'administration/job-list', component: JobListComponent
  },
  {
    path: 'administration/job-view/:id', component: JobViewComponent
  },
  {
    path: 'administration/job-details/:id', component: JobDetailsComponent
  },

  {
    path: 'dollop', component: HomeComponent, canActivate: [AdminGuard],
    children: childrens,
  },
  {
    path: 'employee', component: EmployeeHomeComponent, canActivate: [EmployeeGuard], children: [
      // {
      //   path:"",component:EmployeeHomeComponent
      // },
      {
        path: '', component: EmployeeDashboardComponent
      },

    ]
  },
  {
    path: 'employee-dash', component: EmployeeDashboardComponent
    , children: childrens
  },

  {
    path: 'employees/employeeList', component: EmployeeListComponent
  },
  {
    path: 'employees/tasks', component: TasksComponent
  },


  {
    path: 'employees/employee-attendence', component: EmployeeAttendenceComponent
  },

  {
    path: 'employees/timesheet', component: TimesheetComponent
  },
  {
    path: 'employees/overtime', component: OvertimeComponent
  },

  {
    path: 'employees/tickets', component: TicketsComponent
  },

  {
    path: 'employees/ticket-types', component: TicketTypeComponent
  },

  {
    path: 'administration/assets', component: AssetsComponent
  },
  {
    path: 'administration/manage-jobs', component: ManageJobsComponent
  },
  {
    path: 'administration/job-applicants/:mid', component: JobApplicantsComponent
  },
  {
    path: 'administration/job-list', component: JobListComponent
  },
  {
    path: 'administration/job-details/:id', component: JobDetailsComponent
  },
  {
    path: 'administration/knowledge-base', component: KnowledgeBaseComponent
  },
  {
    path: 'administration/knowledge-base-view/:id', component: KnowledgeBaseViewComponent
  },
  {
    path: 'administration/activites', component: ActivitesComponent
  },
  {
    path: 'administration/users', component: UsersComponent
  },
  {
    path: 'administration/settings/company-settings', component: CompanySettingsComponent
  },
  {
    path: 'administration/settings/localization', component: LocalizationComponent
  },
  {
    path: 'administration/settings/theme-settings', component: ThemeSettingsComponent
  },
  {
    path: 'administration/settings/roles-permissions', component: RolesAndPermissionsComponent
  },
  {
    path: 'administration/settings/email-settings', component: EmailSettingsComponent
  },
  {
    path: 'administration/settings/invoice-settings', component: InvoiceSettingsComponent
  },
  {
    path: 'administration/settings/salary-settings', component: SalaryComponent
  },
  {
    path: 'administration/settings/notifications', component: NotificationsComponent
  },
  {
    path: 'administration/settings/change-password', component: ChangePasswordComponent
  },
  {
    path: 'administration/settings/leave-type', component: LeaveTypeComponent
  },
  {
    path: 'employee/projects/projects', component: ProjectsComponent
  },
  {
    path: 'employee/projects/tasks', component: TasksComponent
  },
  {
    path: "**", component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule],


})
export class AppRoutingModule {


}
