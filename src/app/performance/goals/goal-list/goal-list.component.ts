import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GoalList } from 'src/app/entites/goal-list';
import { GoalType } from 'src/app/entites/goal-type';
import { GoalListService } from 'src/app/services/goal-list.service';
import { GoalTypeService } from 'src/app/services/goal-type.service';
import { DatePipe, Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.scss'],
  providers:[DatePipe]

})
export class GoalListComponent implements OnInit {
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  departmentservice: any;
  department: any;
  isListView: any;
  myForm: FormGroup;
  departments: any;

  
  constructor(
    private goalListService: GoalListService,private datePipe:DatePipe,
    private goaltypeService: GoalTypeService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private location: Location,
    private authService: AuthService
  ) {
    this.myForm =new FormGroup({
      subject : new FormControl('', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/),Validators.minLength(2),Validators.maxLength(10)]),
      targetAchievement : new FormControl('', [Validators.required,Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(4),Validators.maxLength(15)]),
      startDate : new FormControl('', [Validators.required]),
      endDate : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(150)]),
      goalType : new FormControl('', [Validators.required]),
    

     
     })
    this.goalList.goalType = new GoalType();
    this.searching.goalType = new GoalType();
  }

  ngOnInit(): void {
    this.getAllGoalType();
    this.getAllGoalList();
    this.setPermissions();
    this.setBaseUrl();
  }

  baseRoute = 'employee-dash'
  sequence:any=0;

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


  deleteId = 0;

  searching: GoalList = new GoalList();

  goalList: GoalList = new GoalList();
  goalTypeList: GoalList[] = [];
  goal: GoalType = new GoalType();
  GoalTypes: GoalType[] = [];
  // todayDate: String = new Date().toLocaleDateString();

  addGoalList() {
    console.log(this.goalList);
    this.goalListService.addGoalList(this.goalList).subscribe((data: any) => {

       
       
      this.goalList = new GoalList();
      this.getAllGoalList();
      this.sweetAlertMessages.alertMessage('success', 'Goal  Added Successfully.')

    }, (err: any) => {
     this.sweetAlertMessages.alertMessage('question', err.error.status);
    });
  }

  getAllGoalType() {
    this.goaltypeService.getAllGoalTypeByStatusActive(0,10000).subscribe((data: any) => {
      this.GoalTypes = data.content;

    })
  }
// checking age of employee
validateDate(control: any): { [key: string]: boolean } | null {

  if (control.value) {
      let present = new Date();
      let dob = new Date(control.value);


    if (present.getFullYear() - dob.getFullYear() <2) {
      return { 'invalidDate': true };
    }
  }
  return null;
}


  getAllGoalList() {
    this.goalListService.getAllGoalList(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.goalTypeList = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
    })
  }

  setEditData(id: number) {
    this.goalListService.getGoalListByID(id).subscribe((data: any) => {
      this.goalList = data;
    });

  }

  updateGoalList() {
    this.goalListService.updateGoalList(this.goalList).subscribe((data: any) => {
      this.getAllGoalList();
      this.sweetAlertMessages.alertMessage('success', 'Goal Updated successfully.')
    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    })
  }


  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }


  filter() {

    if ((!this.searching || !this.searching.subject || this.searching.subject.trim()=== '') &&
    (!this.searching || !this.searching.goalType.goalType || this.searching.goalType.goalType.trim()=== '')
   
    )
     {
      return;
     }

    this.goalListService.searchGoalList(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.goalTypeList = data.content;

    })
  }
  confirm(id: number) {
    this.deleteId = id;
  }

  deleteGoalList() {
    
    this.goalListService.deleteGoalList(this.deleteId).subscribe((data: any) => {
      this.getAllGoalList();
      this.sweetAlertMessages.alertMessage('success', 'GoalDeleted Successfully.')

    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);

    })
  }



  // pagination

  length = 50;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5, 10];
  pageNo = 0;
  pageSize = 10;
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
    this.getAllGoalList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

  updateGoalListStatus(id: number, status: string) {
    this.goalListService.getGoalListByStatus(status, id).subscribe((data: any) => {
      this.getAllGoalList();
      this.sweetAlertMessages.alertMessage('success', 'Goal Status Updated successfully.')

    }, err => {
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    });
  }
}  
