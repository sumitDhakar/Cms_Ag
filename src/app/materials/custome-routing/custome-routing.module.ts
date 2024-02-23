import { ActivitesComponent } from "src/app/administration/activities/activites/activites.component";
import { AssetsComponent } from "src/app/administration/assets/assets/assets.component";
import { JobApplicantsComponent } from "src/app/administration/jobs/job-applicants/job-applicants.component";
import { JobDetailsComponent } from "src/app/administration/jobs/job-details/job-details.component";
import { JobListComponent } from "src/app/administration/jobs/job-list/job-list.component";
import { ManageJobsComponent } from "src/app/administration/jobs/manage-jobs/manage-jobs.component";
import { KnowledgeBaseViewComponent } from "src/app/administration/knowledgeBase/knowledge-base-view/knowledge-base-view.component";
import { KnowledgeBaseComponent } from "src/app/administration/knowledgeBase/knowledge-base/knowledge-base.component";
import { ChangePasswordComponent } from "src/app/administration/settings/change-password/change-password.component";
import { CompanySettingsComponent } from "src/app/administration/settings/company-settings/company-settings.component";
import { EmailSettingsComponent } from "src/app/administration/settings/email-settings/email-settings.component";
import { InvoiceSettingsComponent } from "src/app/administration/settings/invoice-settings/invoice-settings.component";
import { LeaveTypeComponent } from "src/app/administration/settings/leave-type/leave-type.component";
import { LocalizationComponent } from "src/app/administration/settings/localization/localization.component";
import { NotificationsComponent } from "src/app/administration/settings/notifications/notifications.component";
import { RolesAndPermissionsComponent } from "src/app/administration/settings/roles-and-permissions/roles-and-permissions.component";
import { SalarySettingsComponent } from "src/app/administration/settings/salary-settings/salary-settings.component";
import { ThemeSettingsComponent } from "src/app/administration/settings/theme-settings/theme-settings.component";
import { UserProfileComponent } from "src/app/administration/users/user-profile/user-profile.component";
import { UsersComponent } from "src/app/administration/users/users/users.component";
import { ClientProfileComponent } from "src/app/employees/clients/client-profile/client-profile.component";
import { ClientsListComponent } from "src/app/employees/clients/clients-list/clients-list.component";
import { ClientsComponent } from "src/app/employees/clients/clients/clients.component";
import { AllEmployeesComponent } from "src/app/employees/employees/allEmployee/all-employees/all-employees.component";
import { ProfileComponent } from "src/app/employees/employees/allEmployee/profile/profile.component";
import { AdminAttendenceComponent } from "src/app/employees/employees/attendance/admin-attendence/admin-attendence.component";
import { EmployeeAttendenceComponent } from "src/app/employees/employees/attendance/employee-attendence/employee-attendence.component";
import { DepartmentsComponent } from "src/app/employees/employees/departments/departments.component";
import { DesignationsComponent } from "src/app/employees/employees/designations/designations.component";
import { HolidaysComponent } from "src/app/employees/employees/holidays/holidays/holidays.component";
import { LeaveSettingsComponent } from "src/app/employees/employees/leave-settings/leave-settings.component";
import { AdminLeavesComponent } from "src/app/employees/employees/leaves/admin-leaves/admin-leaves.component";
import { EmployeeLeavesComponent } from "src/app/employees/employees/leaves/employee-leaves/employee-leaves.component";
import { OvertimeComponent } from "src/app/employees/employees/overtime/overtime.component";
import { TimesheetComponent } from "src/app/employees/employees/timesheet/timesheet.component";
import { LeadsComponent } from "src/app/employees/leads/leads.component";
import { ProjectsComponent } from "src/app/employees/projects/projects/projects.component";
import { TaskBoardComponent } from "src/app/employees/projects/task-board/task-board.component";
import { TasksComponent } from "src/app/employees/projects/tasks/tasks.component";
import { ViewProjectComponent } from "src/app/employees/projects/view-project/view-project.component";
import { TicketTypeComponent } from "src/app/employees/tickets/ticket-type/ticket-type.component";
import { TicketsComponent } from "src/app/employees/tickets/tickets/tickets.component";
import { ViewTicketComponent } from "src/app/employees/tickets/view-ticket/view-ticket.component";
import { CreateEstimateComponent } from "src/app/hr/accounts/estimates/create-estimate/create-estimate.component";
import { EditEstimateComponent } from "src/app/hr/accounts/estimates/edit-estimate/edit-estimate.component";
import { EstimateViewComponent } from "src/app/hr/accounts/estimates/estimate-view/estimate-view.component";
import { EstimatesComponent } from "src/app/hr/accounts/estimates/estimates/estimates.component";
import { ExpensesComponent } from "src/app/hr/accounts/expenses/expenses/expenses.component";
import { CreateInvoiceComponent } from "src/app/hr/accounts/invoices/create-invoice/create-invoice.component";
import { EditInvoiceComponent } from "src/app/hr/accounts/invoices/edit-invoice/edit-invoice.component";
import { InvoiceViewComponent } from "src/app/hr/accounts/invoices/invoice-view/invoice-view.component";
import { InvoicesComponent } from "src/app/hr/accounts/invoices/invoices/invoices.component";
import { PaymentsComponent } from "src/app/hr/accounts/payments/payments/payments.component";
import { TaxesComponent } from "src/app/hr/accounts/taxes/taxes/taxes.component";
import { PayrollItemsComponent } from "src/app/hr/payroll/payroll-items/payroll-items/payroll-items.component";
import { PayslipComponent } from "src/app/hr/payroll/payslip/payslip.component";
import { SalaryComponent } from "src/app/hr/payroll/salary/salary.component";
import { PoliciesComponent } from "src/app/hr/policies/policies/policies.component";
import { ExpensesReportComponent } from "src/app/hr/reports/expenses-report/expenses-report.component";
import { InvoiceReportsComponent } from "src/app/hr/reports/invoice-reports/invoice-reports.component";
import { ChatComponent } from "src/app/main/apps/chat/chat.component";
import { ConversationComponent } from "src/app/main/apps/conversation/conversation.component";
import { Error404Component } from "src/app/pages/error-pages/error404/error404.component";
import { GoalListComponent } from "src/app/performance/goals/goal-list/goal-list.component";
import { GoalTypeComponent } from "src/app/performance/goals/goal-type/goal-type.component";
import { PerformanceAppraiselComponent } from "src/app/performance/performance/performance-appraisel/performance-appraisel/performance-appraisel.component";
import { PerformanceIndicatorComponent } from "src/app/performance/performance/performance-indicator/performance-indicator/performance-indicator.component";
import { PerformanceReviewComponent } from "src/app/performance/performance/performance-review/performance-review/performance-review.component";
import { PromotionComponent } from "src/app/performance/promotion/promotion/promotion/promotion.component";
import { ResignationComponent } from "src/app/performance/resignation/resignation/resignation.component";
import { TerminationComponent } from "src/app/performance/termination/termination/termination.component";
import { TrainersComponent } from "src/app/performance/training/trainers/trainers.component";
import { TrainingListComponent } from "src/app/performance/training/training-list/training-list.component";
import { TrainingTypeComponent } from "src/app/performance/training/training-type/training-type.component";
import { CanDeactivateGuard } from "../guards/chat-deactive.guard";
import { EmployeeOvertimeComponent } from "src/app/employees/employees/employee-overtime/employee-overtime.component";

export const childrens: any[] = [
  {
    path:'apps/chats' , component:ChatComponent,  canDeactivate: [CanDeactivateGuard]
  },
  {
      path:'conversation/:recipientId',component:ConversationComponent,outlet:'conversation'
  },
  {
    path: 'administration/manage_jobs', component: ManageJobsComponent
  },
  {
    path: 'administration/job_applicants', component: JobApplicantsComponent
  },
  {
    path: 'employee/allEmployee', component: AllEmployeesComponent
  },
  {
    path: 'employee/employee_profile/:eid', component: ProfileComponent
  },
  {
    path: 'user/profile/:id', component: UserProfileComponent
  },
  {
    path: 'employee/holidays', component: HolidaysComponent
  },
  {
    path: 'employee/attendance_admin', component: AdminAttendenceComponent
  },
  {
    path: 'employee/attendance_employee', component: EmployeeAttendenceComponent
  },

  {
    path: 'employee/leaves_admin', component: AdminLeavesComponent
  },
  {
    path: 'employee/leaves_employee', component: EmployeeLeavesComponent
  },

  {
    path: 'employee/leave_settings', component: LeaveSettingsComponent
  },
  {
    path: 'employee/departments', component: DepartmentsComponent
  },
  {
    path: 'employee/designations', component: DesignationsComponent
  },
  {
    path: 'employee/timesheet', component: TimesheetComponent
  },
  {
    path: 'employee/admin_overtime', component: OvertimeComponent
  }, 
  {
    path: 'employee/employee_overtime', component: EmployeeOvertimeComponent
  },
  {
    path: 'clients', component: ClientsComponent
  },
  {
    path: 'clients/clients_list', component: ClientsListComponent
  },
  {
    path: 'clients/client_view/:cid', component: ClientProfileComponent
  },
  {
    path: 'projects/projects', component: ProjectsComponent
  },
  {
    path: 'projects/projects_view/:id', component: ViewProjectComponent
  },
  {
    path: 'projects/tasks/:id', component: TasksComponent
  },
  {
    path: 'projects/taskBoard/:id', component: TaskBoardComponent
  },
  {
    path: 'employee/leads', component: LeadsComponent
  },
  {
    path: 'tickets/tickets', component: TicketsComponent
  },
  {
    path: 'tickets/ticket_types', component: TicketTypeComponent
  },
  {
    path: 'tickets/ticket_view/:tId', component: ViewTicketComponent
  },
  {
    path: 'accounts/estimates', component: EstimatesComponent
  },
  {
    path: 'accounts/estimates_create', component: CreateEstimateComponent
  },
  {
    path: 'accounts/estimates_view/:id', component: EstimateViewComponent
  },
  {
    path: 'accounts/estimates_edit/:id', component: EditEstimateComponent
  },
  {
    path: 'accounts/invoices', component: InvoicesComponent
  },
  {
    path: 'accounts/invoices_create', component: CreateInvoiceComponent
  },
  {
    path: 'accounts/invoices_view/:id', component: InvoiceViewComponent
  },
  {
    path: 'accounts/invoices_edit/:id', component: EditInvoiceComponent
  }
  ,
  {
    path: 'accounts/payments', component: PaymentsComponent
  },
  {
    path: 'accounts/expenses', component: ExpensesComponent
  },
  {
    path: 'accounts/taxes', component: TaxesComponent
  },
  {
    path: 'payroll/employee_salary', component: SalaryComponent
  },
  {
    path: 'payroll/payslip/:id', component: PayslipComponent
  },
  {
    path: 'payroll/payroll_items', component: PayrollItemsComponent
  },
  {
    path: 'policies', component: PoliciesComponent
  },
  {
    path: 'reports/expenses_report', component: ExpensesReportComponent
  },
  {
    path: 'reports/invoice_report', component: InvoiceReportsComponent
  },
  {
    path: 'performance/performance_indicator', component: PerformanceIndicatorComponent
  },
  {
    path: 'performance/performance_review', component: PerformanceReviewComponent
  },
  {
    path: 'performance/performance_appraisal', component: PerformanceAppraiselComponent
  },
  {
    path: 'goals/goal_list', component: GoalListComponent
  },
  {
    path: 'goals/goal_type', component: GoalTypeComponent
  },
  {
    path: 'training/training_list', component: TrainingListComponent
  },
  {
    path: 'training/trainers', component: TrainersComponent
  },
  {
    path: 'training/training_type', component: TrainingTypeComponent
  },
  {
    path: 'promotion', component: PromotionComponent
  },
  {
    path: 'resignation', component: ResignationComponent
  },
  {
    path: 'termination', component: TerminationComponent
  },
  {
    path: 'assets', component: AssetsComponent
  },
  {
    path: 'jobs/manage_jobs', component: ManageJobsComponent
  },
  {
    path: 'jobs/applied_candidates/:mid', component: JobApplicantsComponent
  },
  {
    path: 'jobs/job_list', component: JobListComponent
  },
  {
    path: 'jobs/job-details/:id', component: JobDetailsComponent
  },
  {
    path: 'knowledge_base', component: KnowledgeBaseComponent
  },
  {
    path: 'knowledge-base-view/:id', component: KnowledgeBaseViewComponent
  },
  {
    path: 'activities', component: ActivitesComponent
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'settings/company_settings', component: CompanySettingsComponent
  },
  {
    path: 'settings/localization', component: LocalizationComponent
  },
  {
    path: 'settings/theme_settings', component: ThemeSettingsComponent
  },
  {
    path: 'settings/roles_permissions', component: RolesAndPermissionsComponent
  },
  {
    path: 'settings/email_settings', component: EmailSettingsComponent
  },
  {
    path: 'settings/invoice_settings', component: InvoiceSettingsComponent
  },
  {
    path: 'settings/salary_settings', component: SalarySettingsComponent
  },
  {
    path: 'settings/notifications', component: NotificationsComponent
  },
  {
    path: 'settings/change_password', component: ChangePasswordComponent
  },
  {
    path: 'settings/leave_type', component: LeaveTypeComponent
  },
  {
    path: "**", component: Error404Component
  }
]