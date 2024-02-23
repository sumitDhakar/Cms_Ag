import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { Trainers } from 'src/app/entites/trainers';
import { TrainingList } from 'src/app/entites/training-list';
import { TrainingType } from 'src/app/entites/training-type';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { Users } from 'src/app/entites/users';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { TrainersService } from 'src/app/services/trainers.service';
import { TrainingListService } from 'src/app/services/training-list.service';
import { TrainingTypeService } from 'src/app/services/training-type.service';


@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  providers:[DatePipe]

})
export class TrainingListComponent implements OnInit {
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  myForm: FormGroup;
  trainingList: TrainingList = new TrainingList();
  trainingType: TrainingType = new TrainingType();
  trainer: Trainers = new Trainers();
  trainersList: Trainers[] = [];


  trainingLists: TrainingList[] = [];
  trainingTypes: TrainingType[] = [];
  isListView: any;

  searching: TrainingList = new TrainingList();

  // user:Users = new Users(); 

  users: UserListResponse[] = [];


  ngOnInit(): void {
    this.getAllTrainingList();
    this.getAllTrainers();
    this.getAllUsers();
    this.getAllTrainingType();
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


  constructor(private trainingListService: TrainingListService,
    private location: Location, private authService: AuthService,private datePipe:DatePipe,
    private usersService: AdminUsersService,
    private TrainingTypeService: TrainingTypeService,
    private builder: FormBuilder,
    private trainersService: TrainersService) { this.myForm = this.builder.group({
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(155)]],
      endDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      trainerCost: ['', [Validators.required,this.TrainerCost(),Validators.pattern(/^[0-9]{4}$/)]],
      employee: ['', [Validators.required,]],
      trainers: ['', [Validators.required, ]],
      trainingType: ['', [Validators.required, ]],
    })
    this.trainingList.employee = new Users();
    this.searching.employee = new Users();
    this.trainingList.trainers = new Trainers();
    this.trainingList.trainingType = new TrainingType();

  }
  TrainerCost() {
    return (control: any) => {
      const trainerCost = control.value;
      if (trainerCost) {
        if ( trainerCost<0) {
          return { cost: true };
        }
      }
      return null;
    };
  }

  // add Training List
  addTrainingList() {
    this.trainingListService.addTrainingList(this.trainingList).subscribe((data: any) => {

      this.getAllTrainingList();
      this.trainingList = new TrainingList();
      this.trainingList.employee = new Users();
      this.trainingList.trainers = new Trainers();
      this.trainingList.trainingType = new TrainingType();
    }, (err: any) => {
      console.log(err)
    });

  }
  getAllTrainers() {
    this.trainersService.getAllTrainingTypeByStatusActive(0, 1000).subscribe((data: any) => {
      this.trainersList = data.content;
    })
  }sequence:any=0;
  // get All Training List
  getAllTrainingList() {
    this.trainingListService.getAllTrainingList(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.trainingLists = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
  
    })
  }

  getAllUsers() {
    this.usersService.getAllEmployees(this.pageIndex, 1000,2).subscribe((data: any) => {
      this.users = data.content;

    })
  }

  getAllTrainingType() {
    this.TrainingTypeService.getAllTrainingTypeByStatusActive(this.pageIndex, 10000).subscribe((data: any) => {
      this.trainingTypes = data.content;

    })
  }

  confirm(id: any) {
    this.trainingList.id = id;
  }

  deleteTrainingList() {

    this.trainingListService.deleteTrainingList(this.trainingList.id).subscribe((data: any) => {
      this.getAllTrainingList();
    })
  }

  setEditData(id: number) {
    this.trainingListService.getTrainingListByID(id).subscribe((data: any) => {
      this.trainingList = data;
      console.log(data);
    });

  }
  updateTrainingList() {
    this.trainingListService.updateTrainingList(this.trainingList).subscribe((data: any) => {

      this.getAllTrainingList();
      this.trainingList = new TrainingList();
      this.trainingList.employee = new Users();
      this.trainingList.trainers = new Trainers();
      this.trainingList.trainingType = new TrainingType();
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

    this.trainingListService.searchTrainingList(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.trainingList = data.content;
    })
  }


  
  updateTrainingListStatus(id: number, status: string) {
    

    this.trainingListService.getTrainingListByStatus(status, id).subscribe((data: any) => {
      this.getAllTrainingList();
    }); 
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
    this.getAllTrainingList();
  }

}
