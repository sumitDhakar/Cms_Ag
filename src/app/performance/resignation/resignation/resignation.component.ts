import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { Resignation } from 'src/app/entites/resignation';
import { Users } from 'src/app/entites/users';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResignationService } from 'src/app/services/resignation.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.scss'],
  providers:[DatePipe]

})
export class ResignationComponent implements OnInit {

  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  E: FormGroup;
  eadit: FormGroup;
  
  resignation: Resignation = new Resignation();
  user: Users = new Users();
  resignations: Resignation[] = [];
  users: UserListResponse[] = [];
  isListView: any;
  sequence:any=0;
  searching: Resignation = new Resignation();


  ngOnInit(): void {
    this.getAllResignation();
    this.getAllUsers();
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
  constructor(private resignationService: ResignationService,private datePipe:DatePipe,
    private location: Location,
    private authService: AuthService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private userService: AdminUsersService) {
      this.eadit=new FormGroup({
     
        reason: new FormControl('', [Validators.required,Validators.pattern(/^[A-Z]{1}([A-Z][a-z]*)+$/)]),
        resigning: new FormControl('', [Validators.required]),
      
        noticeDate: new FormControl('', [Validators.required,]),
        
        employee: new FormControl('', [Validators.required,]),
      }),
      this.E=new FormGroup({
        reason: new FormControl('', [Validators.required]),
        resigning: new FormControl('', [Validators.required]),
      
        noticeDate: new FormControl('', [Validators.required,]),
        
        employee: new FormControl('', [Validators.required,]),
     }),
  
    this.resignation.employee = new Users();
    this.searching.employee = new Users();
  }
  // add assets
  addResignation() {
    AppUtils.formSubmittion(this.E);
    if(!this.E.valid){
      //console.log("invalid");
      return;
    }
    
    this.resignationService.addResignation(this.resignation).subscribe((data: any) => {

      this.getAllResignation();
      this.resignation = new Resignation();
      this.resignation.employee = new Users();
      this.sweetAlertMessages.alertMessage('success', 'Resignation Created For Employee successfully.')
      AppUtils.modelDismiss('add');
    }, (err: any) => {
      console.log(err);
      if(err.error.status>0)
      this.sweetAlertMessages.alertMessage('error',err.error.message);
      else{
      this.sweetAlertMessages.alertMessage('error',err.error.status);

      }
      
    });

  }
  // get All assets list
  getAllResignation() {
    this.resignationService.getAllResignation(this.pageIndex, this.pageSize).subscribe((data: any) => {
      
      this.resignations = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  getAllUsers() {
    this.userService.getAllEmployees(this.pageIndex, 100000,2).subscribe((data: any) => {
      this.users = data.content;
    })
  }

  confirm(id: any) {
    this.resignation.id = id;
  }

  deleteResignation() {
    this.resignationService.deleteResignation(this.resignation.id).subscribe((data: any) => {
      this.getAllResignation();
      this.sweetAlertMessages.alertMessage('success', 'Resignation Deleted Successfully.')
    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    })
  }

  setEditData(id: number) {
    this.resignationService.getResignationByID(id).subscribe((data: any) => {
      this.resignation = data;
    });

  }
  updateResignation() {
    AppUtils.formSubmittion(this.eadit);
    if(!this.eadit.valid){
      //console.log("invalid");
      return;
    }
    
    this.resignationService.updateResignation(this.resignation).subscribe((data: any) => {
      this.getAllResignation();
      this.sweetAlertMessages.alertMessage('success', 'Resignation Updated Successfully.')
      AppUtils.modelDismiss('eadit');
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
    if(this.searching.employee.firstName==null||this.searching.employee.firstName.trim()=='')
    {
      return;
    }

    this.resignationService.searchResignation(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.resignations = data.content;
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
    this.getAllResignation();
  }


}


