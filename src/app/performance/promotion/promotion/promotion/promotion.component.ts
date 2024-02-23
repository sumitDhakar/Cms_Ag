import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { Promotion } from 'src/app/entites/promotion';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';
import { EmployeeUsersService } from 'src/app/services/employee/employeeUsers.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { DatePipe, Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { environment } from 'src/environments/environment';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  providers:[DatePipe]

})
export class PromotionComponent implements OnInit {

  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  searching: Promotion = new Promotion();
  user: Users = new Users();

  E: FormGroup;
  eadit: FormGroup;
  users: UserListResponse[] = [];
  department: Department = new Department();
  designation: Designation = new Designation();
  confirmPassword = '';
  isListView = false;
  departments: Department[] = [];
  designations: Designation[] = [];

  promotionsList: Promotion[] = [];

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  // todayDate: String = new Date().toLocaleDateString();
  promotion: Promotion = new Promotion();
  deletePromotionId = 0;
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  constructor(private usersService: AdminUsersService, private employeeUserService: EmployeeUsersService,
    private location: Location, private authService: AuthService,
    private designationService: DesignationService,private datePipe:DatePipe,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private promotionService: PromotionService, private employeeDesignation: EmployeeDesignationService
  ) {
    this.E=new FormGroup({
     
      employee: new FormControl('', [Validators.required]),
      designationTo: new FormControl('', [Validators.required,]),
      designationFrom: new FormControl('', [Validators.required,]),
      promotionDate: new FormControl('', [Validators.required,]),
    }),
    this.eadit=new FormGroup({
     
      employee: new FormControl('', [Validators.required]),
      designationTo: new FormControl('', [Validators.required,]),
      designationFrom: new FormControl('', [Validators.required,]),
      promotionDate: new FormControl('', [Validators.required,]),
    }),

    this.searching.employee = new Users();
    this.searching.designationTo = new Designation();
    this.user.designation = new Designation();
    this.user.designation.department = new Department();

   // this.promotion.employee = new Users();
    this.promotion.designationTo = new Designation();

    this.selectedUser.designation = new Designation();
    this.selectedUser.designation.department = new Department();
  }


  ngOnInit(): void {
    this.getAllPromotions();

    this.getAllDesignations();
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


  setDeleteData(id: any) {
    this.deletePromotionId = id;
  }


  addForm() {

  }

  getAllDesignations() {
    this.employeeDesignation.getAllDesignation(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.designations = data;
    })
  }

  getAllDesignationsByDepartment(id: number) {
    this.designationService.getAllDesignationByDepartmentId(id).subscribe((data: any) => {
      this.designations = data;
    })
  }


  selectedUser: Users = new Users();
  optionSelected(tag: any) {
    if(tag!=null && tag>0){
      this.employeeUserService.getEmployeeById(tag).subscribe((data: any) => {
        this.selectedUser = data;
        this.promotion.designationFrom = this.selectedUser.designation.title;
        this.getAllDesignationsByDepartment(this.selectedUser.designation.department.id);
      });
    }

  }

  // adding promotion
  addPromotion() {
    AppUtils.formSubmittion(this.E);
    if(!this.E.valid){
      return;
    }
    this.promotionService.addPromotion(this.promotion).subscribe((data: any) => {
      this.getAllPromotions();
      this.sweetAlertMessages.alertMessage('success', 'Employee Promoted Successfully.')
      this.promotion = new Promotion();
      this.promotion.designationTo = new Designation();
      this.promotion.employee = new Users();
      AppUtils.modelDismiss('add');
    }, err => {
         if(err.error.status==1008)
      this.sweetAlertMessages.alertMessage('error',"You Should Wait Alteast 6 Months First");
      if(err.error.status>0)
      this.sweetAlertMessages.alertMessage("error",err.error.message) ;

        
      else
        this.sweetAlertMessages.alertMessage("error",err.error.status) });
  }
  sequence:any=0;
  // getting all promotions
  getAllPromotions() {
    
    this.promotionService.getAllPromotions(this.pageIndex, this.pageSize).subscribe((data: any) => {

      this.promotionsList = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }
  // getting all Employees
  getAllEmployees() {
    this.usersService.getAllEmployees(this.pageIndex, 10000,2).subscribe((data: any) => {
      this.users = data.content;

      this.length = data.totalElements;
    })
  }

  // setting data in edit form
  setEditData(id: number) {
    this.promotionService.getPromotionByPromotionId(id).subscribe((data: any) => {
      this.promotion = data;
       this.getAllDesignationsByDepartment(this.promotion.employee.designation.department.id);      
    });
  }

  // updating data
  updatePromotion() {
    AppUtils.formSubmittion(this.eadit);
    if(!this.eadit.valid){
      return;
    }
    this.promotionService.updatePromotion(this.promotion).subscribe((data: any) => {
      this.getAllPromotions();
      this.sweetAlertMessages.alertMessage('success', 'Employee Promotion Details Changed SuccesFully.')
      AppUtils.modelDismiss('editClose');
    }, err => {
      console.log( err.error.status);
      if(err.error.status==1008)
      this.sweetAlertMessages.alertMessage('error',"You Should Wait Alteast 6 Months First");
      if(err.error.status==302)
      this.sweetAlertMessages.alertMessage('error',"Promotion Date Should Only Be Current Date");
   
    })
  }

  // changing view of employee
  changeView(put: boolean) {
    this.isListView = put;
  }


  // searching the promotion
  filter() {

    if ((!this.searching || !this.searching.employee.firstName || this.searching.employee.firstName.trim() === '') &&
    (!this.searching|| !this.searching.designationTo.id || this.searching.designationTo.id === 0))
     {
  return;
    }

    this.promotionService.searchPromotionByExample(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.promotionsList = data.content;
      this.length = data.totalElements;
      this.searching = new Promotion();
    this.searching.employee = new Users();
    this.searching.designationTo = new Designation();


    })
  }

  // setting id for delete
  confirm(id: number) {
    this.deletePromotionId = id;
  }

  // delete employee
  deletePromotion() {
    this.promotionService.deletePromotionById(this.deletePromotionId).subscribe((data: any) => {
      this.getAllPromotions();
      this.sweetAlertMessages.alertMessage('success', 'Promotiomn Deleted Successfully.')
    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    })
  }


  // pagination


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getAllPromotions();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}

