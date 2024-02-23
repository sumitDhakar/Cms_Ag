import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './main/dashboard/adminDashboard/layouts/nav/nav/nav.component';
import { SidenavComponent } from './main/dashboard/adminDashboard/layouts/sideNav/sidenav/sidenav.component';
import { AdminDashboardComponent } from './main/dashboard/adminDashboard/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './main/dashboard/employeeDashboard/employee-dashboard/employee-dashboard.component';
import { AllEmployeesComponent } from './employees/employees/allEmployee/all-employees/all-employees.component';
import { EmployeeListComponent } from './employees/employees/allEmployee/employee-list/employee-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HolidaysComponent } from './employees/employees/holidays/holidays/holidays.component';
import { AdminLeavesComponent } from './employees/employees/leaves/admin-leaves/admin-leaves.component';
import { EmployeeLeavesComponent } from './employees/employees/leaves/employee-leaves/employee-leaves.component';
import { LeaveSettingsComponent } from './employees/employees/leave-settings/leave-settings.component';
import { AdminAttendenceComponent } from './employees/employees/attendance/admin-attendence/admin-attendence.component';
import { EmployeeAttendenceComponent } from './employees/employees/attendance/employee-attendence/employee-attendence.component';
import { DepartmentsComponent } from './employees/employees/departments/departments.component';
import { DesignationsComponent } from './employees/employees/designations/designations.component';
import { TimesheetComponent } from './employees/employees/timesheet/timesheet.component';
import { OvertimeComponent } from './employees/employees/overtime/overtime.component';
import { ClientsComponent } from './employees/clients/clients/clients.component';
import { ClientsListComponent } from './employees/clients/clients-list/clients-list.component';
import { ClientProfileComponent } from './employees/clients/client-profile/client-profile.component';

import { TicketsComponent } from './employees/tickets/tickets/tickets.component';
import { EstimatesComponent } from './hr/accounts/estimates/estimates/estimates.component';
import { CreateEstimateComponent } from './hr/accounts/estimates/create-estimate/create-estimate.component';
import { EstimateViewComponent } from './hr/accounts/estimates/estimate-view/estimate-view.component';
import { ProfileComponent } from './employees/employees/allEmployee/profile/profile.component';
import { InvoicesComponent } from './hr/accounts/invoices/invoices/invoices.component';
import { CreateInvoiceComponent } from './hr/accounts/invoices/create-invoice/create-invoice.component';
import { InvoiceViewComponent } from './hr/accounts/invoices/invoice-view/invoice-view.component';
import { PaymentsComponent } from './hr/accounts/payments/payments/payments.component';
import { ExpensesComponent } from './hr/accounts/expenses/expenses/expenses.component';
import { TaxesComponent } from './hr/accounts/taxes/taxes/taxes.component';
import { SalaryComponent } from './hr/payroll/salary/salary.component';
import { PayslipComponent } from './hr/payroll/payslip/payslip.component';
import { PayrollItemsComponent } from './hr/payroll/payroll-items/payroll-items/payroll-items.component';
import { PoliciesComponent } from './hr/policies/policies/policies.component';
import { ExpensesReportComponent } from './hr/reports/expenses-report/expenses-report.component';
import { InvoiceReportsComponent } from './hr/reports/invoice-reports/invoice-reports.component';
import { EditEstimateComponent } from './hr/accounts/estimates/edit-estimate/edit-estimate.component';
import { EditInvoiceComponent } from './hr/accounts/invoices/edit-invoice/edit-invoice.component';
import { PerformanceIndicatorComponent } from './performance/performance/performance-indicator/performance-indicator/performance-indicator.component';
import { PerformanceReviewComponent } from './performance/performance/performance-review/performance-review/performance-review.component';
import { GoalListComponent } from './performance/goals/goal-list/goal-list.component';
import { GoalTypeComponent } from './performance/goals/goal-type/goal-type.component';
import { TrainingListComponent } from './performance/training/training-list/training-list.component';
import { TrainersComponent } from './performance/training/trainers/trainers.component';
import { TrainingTypeComponent } from './performance/training/training-type/training-type.component';
import { PromotionComponent } from './performance/promotion/promotion/promotion/promotion.component';
import { ResignationComponent } from './performance/resignation/resignation/resignation.component';
import { TerminationComponent } from './performance/termination/termination/termination.component';
import { AssetsComponent } from './administration/assets/assets/assets.component';
import { ManageJobsComponent } from './administration/jobs/manage-jobs/manage-jobs.component';
import { JobApplicantsComponent } from './administration/jobs/job-applicants/job-applicants.component';
import { JobDetailsComponent } from './administration/jobs/job-details/job-details.component';
import { KnowledgeBaseComponent } from './administration/knowledgeBase/knowledge-base/knowledge-base.component';
import { KnowledgeBaseViewComponent } from './administration/knowledgeBase/knowledge-base-view/knowledge-base-view.component';
import { ActivitesComponent } from './administration/activities/activites/activites.component';
import { UsersComponent } from './administration/users/users/users.component';
import { CompanySettingsComponent } from './administration/settings/company-settings/company-settings.component';
import { LocalizationComponent } from './administration/settings/localization/localization.component';
import { ThemeSettingsComponent } from './administration/settings/theme-settings/theme-settings.component';
import { RolesAndPermissionsComponent } from './administration/settings/roles-and-permissions/roles-and-permissions.component';
import { EmailSettingsComponent } from './administration/settings/email-settings/email-settings.component';
import { InvoiceSettingsComponent } from './administration/settings/invoice-settings/invoice-settings.component';
import { SalarySettingsComponent } from './administration/settings/salary-settings/salary-settings.component';
import { NotificationsComponent } from './administration/settings/notifications/notifications.component';
import { ChangePasswordComponent } from './administration/settings/change-password/change-password.component';
import { LeaveTypeComponent } from './administration/settings/leave-type/leave-type.component';
import { ProjectsComponent } from './employees/projects/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';

import { KeysPipe } from './materials/utils/KeysPipe';
import { TaskBoardComponent } from './employees/projects/task-board/task-board.component';
import { ViewProjectComponent } from './employees/projects/view-project/view-project.component';
import { LeadsComponent } from './employees/leads/leads.component';
import { TicketTypeComponent } from './employees/tickets/ticket-type/ticket-type.component';
import { FileSizePipe } from './materials/utils/FileSizePipe';

import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { authInterceptorProviders } from './materials/auth.interceptor';
import { HomeComponent } from './home/home/home.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { EmployeeHomeComponent } from './home/Employee/employee-home/employee-home.component';

import { JobListComponent } from './administration/jobs/job-list/job-list.component';
import { DateDifferencePipe } from './materials/utils/date-difference.pipe';
import { JobViewComponent } from './administration/jobs/job-view/job-view.component';

import { Error404Component } from './pages/error-pages/error404/error404.component';
import { Error500Component } from './pages/error-pages/error500/error500.component';
import { PerformanceAppraiselComponent } from './performance/performance/performance-appraisel/performance-appraisel/performance-appraisel.component';
import { StringSplitPipe } from './materials/utils/string-split.pipe';


import { WebsocketService } from './services/websocket-service.service';

import { UserProfileComponent } from './administration/users/user-profile/user-profile.component';

import { ViewTicketComponent } from './employees/tickets/view-ticket/view-ticket.component';
 import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { BasicDetailsComponent } from './authentication/basic-details/basic-details.component';
import { DateFormatPipe } from './materials/utils/date-format.pipe';
import { ForgetVerificationComponent } from './authentication/forget-password/forget-verification/forget-verification.component';
import { ChatComponent } from './main/apps/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './materials/material/material.module';
import { NgModule } from '@angular/core';
import { TasksComponent } from './employees/projects/tasks/tasks.component';


import { NgApexchartsModule } from 'ng-apexcharts';
import { ConversationComponent } from './main/apps/conversation/conversation.component';
import * as numberToWords from 'number-to-words';
import { NumberToWordsPipe } from './materials/utils/number-to-words.pipe';
import { EmployeeOvertimeComponent } from './employees/employees/employee-overtime/employee-overtime.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidenavComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    AllEmployeesComponent,
    EmployeeListComponent,
    HolidaysComponent,
    AdminLeavesComponent,
    EmployeeLeavesComponent,
    LeaveSettingsComponent,
    AdminAttendenceComponent,
    EmployeeAttendenceComponent,
    DepartmentsComponent,
    DesignationsComponent,
    TimesheetComponent,
    OvertimeComponent,
    ClientsComponent,
    ClientsListComponent,
    ClientProfileComponent,
    LeadsComponent,
    TicketsComponent,
    EstimatesComponent,
    CreateEstimateComponent,
    EstimateViewComponent,
    ProfileComponent,
    InvoicesComponent,
    CreateInvoiceComponent,
    InvoiceViewComponent,
    PaymentsComponent,
    ExpensesComponent,
    TaxesComponent,
    SalaryComponent,
    PayslipComponent,
    PayrollItemsComponent,
    PoliciesComponent,
    ExpensesReportComponent,
    InvoiceReportsComponent,
    EditEstimateComponent,
    EditInvoiceComponent,
    PerformanceIndicatorComponent,
    PerformanceReviewComponent,
    PerformanceAppraiselComponent,
    GoalListComponent,
    GoalTypeComponent,
    TasksComponent,
    TrainingListComponent,
    TrainersComponent,
    TrainingTypeComponent,
    PromotionComponent,
    ResignationComponent,
    TerminationComponent,
    AssetsComponent,
    ManageJobsComponent,
    JobApplicantsComponent,
    JobDetailsComponent,
    KnowledgeBaseComponent,
    KnowledgeBaseViewComponent,
    ActivitesComponent,
    UsersComponent,
    CompanySettingsComponent,
    LocalizationComponent,
    ThemeSettingsComponent,
    RolesAndPermissionsComponent,
    EmailSettingsComponent,
    InvoiceSettingsComponent,
    SalarySettingsComponent,
    NotificationsComponent,
    ChangePasswordComponent,
    LeaveTypeComponent,
    ProjectsComponent,
    KeysPipe,
    FileSizePipe,
    TaskBoardComponent,
    ViewProjectComponent,
    TicketTypeComponent,
    JobListComponent,
    DateDifferencePipe,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ForgetPasswordComponent,
    EmployeeHomeComponent,
    JobListComponent,
    JobViewComponent,
    Error404Component,
    Error500Component,
    StringSplitPipe,
    ViewTicketComponent,
    UserProfileComponent,
    OtpVerificationComponent,
    BasicDetailsComponent,
    DateFormatPipe,
    ForgetVerificationComponent,
    ChatComponent,
    ConversationComponent,
    NumberToWordsPipe,
    EmployeeOvertimeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    CKEditorModule
   
  ],
  providers: [authInterceptorProviders,
    { provide: 'numberToWords', useValue: numberToWords }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
