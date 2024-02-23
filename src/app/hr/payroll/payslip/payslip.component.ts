import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { StaffSalary } from 'src/app/entites/staff-salary';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { StaffSalaryService } from 'src/app/services/staff-salary.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Permissions } from 'src/app/entites/permissions';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;
  staffSalary: StaffSalary = new StaffSalary();
  staffSalarys: StaffSalary[] = [];
  isListView: any;

  user: Users = new Users();
  usersList: Users[] = [];


  searching: StaffSalary = new StaffSalary();

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.staffSalary.id = param['id'];
      this.getstaffSalaryById();
    });
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


  constructor(private staffSalaryService: StaffSalaryService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
    , private location: Location) {
    this.staffSalary.staff = new Users();
    this.searching.staff = new Users();


  }

  // get staffSalary by id
  getstaffSalaryById() {
    this.staffSalaryService.getStaffSalaryByID(this.staffSalary.id).subscribe((data: any) => {
      this.staffSalary = data;


    })
  }


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }




  generatePDF() {
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.staffSalary.staff.firstName + '.pdf'); // Download the PDF
    });
  }



  exportToCSV() {
    const csvContent = this.convertToCSV(this.staffSalarys);
    this.downloadCSV(csvContent, this.staffSalary.staff.firstName + "staffSalarys" + '.csv');
  }

  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',');
    const csv = data.map(item => Object.values(item).join(','));
    return [header, ...csv].join('\n');
  }

  downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; a.click();
    window.URL.revokeObjectURL(url);
  }




  /// pagination 
  length = 50;
  pageSize = 100;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  //   this.getAllStaffSalary();
  // }


}
