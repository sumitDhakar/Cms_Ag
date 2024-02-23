import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { Permissions } from 'src/app/entites/permissions';
import { Termination } from 'src/app/entites/termination';
import { TerminationType } from 'src/app/entites/termination-type';
import { Users } from 'src/app/entites/users';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { TerminationTypeService } from 'src/app/services/termination-type.service';
import { TerminationService } from 'src/app/services/termination.service';

@Component({
  selector: 'app-termination',
  templateUrl: './termination.component.html',
  styleUrls: ['./termination.component.scss'],
  providers:[DatePipe]

})
export class TerminationComponent implements OnInit {
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  searching: Termination = new Termination();
  termination: Termination = new Termination();
  terminations: Termination[] = [];
  terminationTypeS: TerminationType[] = [];
  users: UserListResponse[] = [];
  isListView: any;
  terminationType: TerminationType = new TerminationType();



  ngOnInit(): void {
    this.getAllTermination();
    this.getAllUsers();
    this.getAllTerminationtype();
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


  constructor(private terminationService: TerminationService,
    private authService: AuthService, private location: Location,private datePipe:DatePipe,
    private userService: AdminUsersService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private terminationTypeService: TerminationTypeService) {
    this.termination.employee = new Users();
    this.termination.terminationType = new TerminationType();
    this.termination.employee.designation = new Designation();
    this.termination.employee.designation.department = new Department();
  }



  // add termination
  addTermination() {

    this.terminationService.addTermination(this.termination).subscribe((data: any) => {

      this.getAllTermination();
      this.termination = new Termination();
      this.termination.employee = new Users();
      this.termination.terminationType = new TerminationType();
      this.sweetAlertMessages.alertMessage('success', 'Employee Termination Created.')

    }, (err: any) => {
      this.sweetAlertMessages.alertMessage('error',  err.error.message);
    });
  }
  // addTerminationType

  addTerminationType() {
  alert("kjhk")
    this.terminationTypeService.addTerminationType(this.terminationType).subscribe((data: any) => {
      this.changePage = false;
      this.getAllTerminationtype();
      this.sweetAlertMessages.alertMessage('success', 'Terminitation Type  Added successfully.')

    }, (err: any) => {
      this.sweetAlertMessages.alertMessage('question', "Type Already Present " + err.error.status);
    });
  }
  sequence:any=0;
  // get All termination list
  getAllTermination() {
    this.terminationService.getAllTermination(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.terminations = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  getAllUsers() {
    this.userService.getAllEmployees(this.pageIndex, 200000, 2).subscribe((data: any) => {
      this.users = data.content;
    })
  }

  getAllTerminationtype() {
    this.terminationTypeService.getAllTerminationtype(0, 1000).subscribe((data: any) => {
      this.terminationTypeS = data.content;
    })
  }

  confirm(id: any) {
    this.termination.id = id;
  }

  deleteTermination() {

    this.terminationService.deleteTermination(this.termination.id).subscribe((data: any) => {
      this.getAllTermination();
      this.sweetAlertMessages.alertMessage('success', 'Termination Deleted successfully.')

    })
  }

  setEditData(id: number) {
    this.terminationService.getTerminationById(id).subscribe((data: any) => {
      this.termination = data;
    });

  }
  updateTermination() {
    this.terminationService.updateTermination(this.termination).subscribe((data: any) => {
      this.termination = new Termination();
      this.termination.employee = new Users();
      this.termination.terminationType = new TerminationType();
      this.getAllTermination();
      this.sweetAlertMessages.alertMessage('success', 'Termination Updated Successfully.')

    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);
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

    this.terminationService.searchTerminationn(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.termination = data.content;
      this.length = data.totalElements;
    })
  }




  /// pagination 
  deleteId = 0;
  length = 50;
  pageSize = 5;
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
    this.getAllTermination();
  }


  changePage: boolean = false;
  change() {
    this.changePage = true;
  }

}


