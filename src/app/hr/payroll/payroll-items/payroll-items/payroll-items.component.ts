import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PayrollItemsAdditions } from 'src/app/entites/payroll-items-additions';
import { PayrollItemsDeductions } from 'src/app/entites/payroll-items-deductions';
import { PayrollItemsOvertime } from 'src/app/entites/payroll-items-overtime';
import { Permissions } from 'src/app/entites/permissions';
import { AuthService } from 'src/app/services/auth.service';
import { PayrollItemsAdditionsService } from 'src/app/services/payroll-items-additions.service';
import { PayrollItemsDeductionsService } from 'src/app/services/payroll-items-deductions.service';
import { PayrollItemsOvertimeService } from 'src/app/services/payroll-items-overtime.service';

@Component({
  selector: 'app-payroll-items',
  templateUrl: './payroll-items.component.html',
  styleUrls: ['./payroll-items.component.scss']
})
export class PayrollItemsComponent {


  payrollItemsAddition: PayrollItemsAdditions = new PayrollItemsAdditions();
  additions: PayrollItemsAdditions[] = [];

  overTimeList: PayrollItemsOvertime[] = [];
  overtime: PayrollItemsOvertime = new PayrollItemsOvertime();
  deduction: PayrollItemsDeductions = new PayrollItemsDeductions();
  deductions: PayrollItemsDeductions[] = [];



  ngOnInit(): void {
    this.getAllPayrollItemsAddition();
    this.getAllPayrollItemsOvertime();
    this.getAllPayrollItemsDeductions();
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


  constructor(private deductionsService: PayrollItemsDeductionsService,
    private payrollItemsAdditionsService: PayrollItemsAdditionsService,
    private location: Location, private authService: AuthService,
    private overtimeService: PayrollItemsOvertimeService) {

  }

  // add PayrollItems Deductions 
  addPayrollItemsDeductions() {
    this.deductionsService.addPayrollItemsDeductions(this.deduction).subscribe((data: any) => {
      this.getAllPayrollItemsDeductions();
    },);
  }


  //  get All PayrollItems Deductions
  getAllPayrollItemsDeductions() {
    this.deductionsService.getAllPayrollItemsDeductions(this.pageIndex, this.pageSize).subscribe((data: any) => {
      console.log(data);
      this.deductions = data.content;
      this.length = data.totalElements;
    })
  }
  //deletepay PayrollItems Deductions
  DeletepayPayrollItemsDeductions() {

    alert(this.deleteId);
    this.deductionsService.deletePayrollItemsDeductions(this.deleteId).subscribe((data: any) => {
      this.getAllPayrollItemsDeductions();
    })
  }

  // set Edit Data Deductions
  setEditDataDeductions(id: number) {
    this.deductionsService.getpayrollItemsDeductionsByID(id).subscribe((data: any) => {
      this.deduction = data;
      console.log(data);
    });
  }

  //update PayrollItems Deductions
  updatePayrollItemsDeductions() {
    this.deductionsService.updatePayrollItemsDeductions(this.deduction).subscribe((data: any) => {

      this.getAllPayrollItemsDeductions();

    })
  }
  //............................................PayrollItemsAdditions..................

  // add PayrollItems Additions
  addPayrollItemsAdditions() {
    this.payrollItemsAdditionsService.addPayrollItemsAdditions(this.payrollItemsAddition).subscribe((data: any) => {
      this.getAllPayrollItemsAddition();
      console.log(data);
    },);
  }

  // get All PayrollItems Addition
  getAllPayrollItemsAddition() {
    this.payrollItemsAdditionsService.getAllPayrollItemsAdditions(this.pageIndex, this.pageSize).subscribe((data: any) => {

      console.log(data.content);
      this.additions = data.content;
      this.length = data.totalElements;
    })
  }
  // set Edit Data
  setEditData(id: number) {
    this.payrollItemsAdditionsService.getPayrollItemsAdditionsByID(id).subscribe((data: any) => {
      this.payrollItemsAddition = data;
      console.log(data);
    });
  }

  //update Payroll Items Addition
  updatePayrollItemsAddition() {
    this.payrollItemsAdditionsService.updatePayrollItemsAdditions(this.payrollItemsAddition).subscribe((data: any) => {

      this.getAllPayrollItemsAddition();

    })
  }
  //deletepayrollItemsAddition
  DeletepayrollItemsAddition() {
    alert(this.deleteId);
    this.payrollItemsAdditionsService.deletePayrollItemsAdditions(this.deleteId).subscribe((data: any) => {
      this.getAllPayrollItemsAddition();
    })
  }


  //..........................................PayrollItemsOvertime.................................

  //add Payroll Items Overtime
  addPayrollItemsOvertime() {
    console.log("data" + this.overtime);

    // alert(this.overtime.rate)
    this.overtimeService.addPayrollItemsOvertime(this.overtime).subscribe((data: any) => {

      this.getAllPayrollItemsOvertime();
      console.log(data);

    }, (err: any) => {
      console.log(err)
    });
  }



  // get All PayrollItems Overtime
  getAllPayrollItemsOvertime() {
    this.overtimeService.getAllPayrollItemsOvertime(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.overTimeList = data.content;
      // this.length = data.totalElements;
    })
  }



  deleteId = 0;
  confirm(id: any) {
    this.deleteId = id;
  }
  //deletepay Payroll Items Overtime
  DeletepayPayrollItemsOvertime() {
    alert(this.deleteId);
    this.overtimeService.deletePayrollItemsOvertime(this.deleteId).subscribe((data: any) => {
      this.getAllPayrollItemsOvertime();
    })
  }



  //set Edit Data Overtim
  setEditDataOvertim(id: number) {
    this.overtimeService.getPayrollItemsOvertimeByID(id).subscribe((data: any) => {
      this.overtime = data;
      console.log(data);
    });
  }

  //update PayrollItems Overtime
  updatePayrollItemsOvertime() {
    this.overtimeService.updatePayrollItemsOvertime(this.overtime).subscribe((data: any) => {

      this.getAllPayrollItemsAddition();

    })
  }
 // pagination

 length = 50;
 pageIndex = 0;
 pageSize=10;
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
   this.getAllPayrollItemsAddition();
 }

 handlPageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex;
  this.getAllPayrollItemsDeductions();
}


handPageEvent(e: PageEvent) {
  this.pageEvent = e;
  this.length = e.length;
  this.pageSize = e.pageSize;
  this.pageIndex = e.pageIndex;
  this.getAllPayrollItemsOvertime();
}

}
