import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { StaffSalary } from 'src/app/entites/staff-salary';
import { Users } from 'src/app/entites/users';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { StaffSalaryService } from 'src/app/services/staff-salary.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {

  staffSalary: StaffSalary = new StaffSalary();
  staffSalarys: StaffSalary[] = [];
  isListView: any;

  user: Users = new Users();
  usersList: UserListResponse[] = [];


  searching: StaffSalary = new StaffSalary();

  ngOnInit(): void {
    this.getAllStaffSalary();
    this.getAllEmployees();
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
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  constructor(private staffSalaryService: StaffSalaryService,
    private location: Location, private authService: AuthService,
    private employeeUserService: AdminUsersService) {
    this.staffSalary.staff = new Users();
    this.searching.staff = new Users();
  }

  confirm1 = false;
  confirm2 = false;

  calculateResult(inp: any) {

    this.confirm1 = true;
    if (inp == 1) {
      this.staffSalary.netSalary = this.staffSalary.basicStaffSalary + this.staffSalary.allowance + this.staffSalary.da + this.staffSalary.hra + this.staffSalary.conveyance + this.staffSalary.medicalAllowance + this.staffSalary.others;
    }
    else if (inp == 2) {
      this.staffSalary.payslip = this.staffSalary.netSalary - (this.staffSalary.others1 + this.staffSalary.labourWelfare + this.staffSalary.profTax + this.staffSalary.leave + this.staffSalary.pf + this.staffSalary.esi + this.staffSalary.tds);
      this.addStaffSalary();
    }
  }



  getAllEmployees() {
    this.employeeUserService.getAllEmployees(0, 10000,2).subscribe((data: any) => {
      this.usersList = data.content;
    })
  }

  // add Trainers
  addStaffSalary() {

    this.staffSalaryService.addStaffSalary(this.staffSalary).subscribe((data: any) => {
      this.staffSalary = new StaffSalary();
    this.staffSalary.staff = new Users();

      this.confirm1 = false;
      this.getAllStaffSalary();

    }, (err: any) => {
      console.log(err)
      alert("something went wrong")
    });

  }
  // get All Training List
  getAllStaffSalary() {
    this.staffSalaryService.getAllStaffSalary(this.pageIndex, this.pageSize).subscribe((data: any) => {
      console.log(data.content);
      this.staffSalarys = data.content;

      this.length = data.totalElements;
    })
  }
  id = 0;
  selectedStaff(inp: any) {
    this.id = inp;
    this.usersList.forEach(t => {

      if (t.id == this.id) {

        this.staffSalary.staff.id = t.id;
      }
    });

  }
  deleteId = 0;
  confirm(id: any) {
    this.deleteId = id;
  }

  deleteStaffSalary() {

    this.staffSalaryService.deleteStaffSalary(this.deleteId).subscribe((data: any) => {
      this.getAllStaffSalary();
      this.deleteId = 0;
    })
  }

  setEditData(id: number) {
    this.staffSalaryService.getStaffSalaryByID(id).subscribe((data: any) => {
      this.staffSalary = data;
      console.log(data);

    });

  }
  updateStaffSalary() {
    this.staffSalaryService.updateStaffSalary(this.staffSalary).subscribe((data: any) => {

      this.getAllStaffSalary();
      this.staffSalary = new StaffSalary();

    })
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }





  filter() {
    console.log(this.searching);

    this.staffSalaryService.searchStaffSalary(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.staffSalarys = data.content;
    })
  }

  /// pagination 
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5,10];

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
    this.getAllStaffSalary();
  }



}
