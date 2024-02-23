import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Designation } from 'src/app/entites/designation';
import { Permissions } from 'src/app/entites/permissions';
import { Trainers } from 'src/app/entites/trainers';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';
import { TrainersService } from 'src/app/services/trainers.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {
  myForm: FormGroup;
  trainer: Trainers = new Trainers();
  trainers: Trainers[] = [];
  designation: Designation = new Designation();
  designations: Designation[] = [];
  isListView: any;

  searching: Trainers = new Trainers();

  ngOnInit(): void {
    this.getAllTrainers();
    this.getAllDesignation();
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



  constructor(private trainersService: TrainersService, private location: Location,
    private authService: AuthService, private employeeDesignation: EmployeeDesignationService, private builder: FormBuilder) {

    this.myForm = this.builder.group({
      firstName: ['', [Validators.required,Validators.pattern(/^([A-Z][a-z]*)+$/) ,Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required,  Validators.pattern(/^([A-Z][a-z]*)+$/),Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10), this.phoneStartsWithGreaterThanFiveValidator()]],
      role: ['', Validators.required]
    }),
      this.trainer.role = new Designation();
    this.searching.role = new Designation();
  }



  phoneStartsWithGreaterThanFiveValidator() {
    return (control: any) => {
      const phoneNumber = control.value;
      if (phoneNumber && phoneNumber.length > 0) {
        const firstDigit = parseInt(phoneNumber.charAt(0), 10);

        if (firstDigit <= 5) {
          return { phoneStartsWithLessThanSix: true };
        }
      }
      return null;
    };
  }


  // add Trainers
  addTrainers() {
    alert(this.trainer.role.id)
    this.trainersService.addTrainers(this.trainer).subscribe((data: any) => {

      this.getAllTrainers();
      this.trainer = new Trainers();
      this.trainer.role = new Designation();
    }, (err: any) => {
      console.log(err)
    });

  }
  designationSelected(id: any) {
    alert(id.value)
    this.trainer.role.id = id.value;
  }

  getAllDesignation() {
    this.employeeDesignation.getAllDesignation(this.pageIndex, 10000).subscribe((data: any) => {
      console.log(data);
      this.designations = data;
    })
  }
  sequence:any=0;
  // get All Training List
  getAllTrainers() {
    this.trainersService.getAllTrainers(this.pageIndex, this.pageSize).subscribe((data: any) => {
      
      this.trainers = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
  
    })
  }

  deleteId = 0;
  confirm(id: any) {
    this.deleteId = id;
  }

  deleteTrainers() {

    this.trainersService.deleteTrainers(this.deleteId).subscribe((data: any) => {
      this.getAllTrainers();
      this.deleteId = 0;
    })
  }

  setEditData(id: number) {
    this.trainersService.getTrainersByID(id).subscribe((data: any) => {
      this.trainer = data;
      console.log(data);

    });

  }
  updateTrainingList() {
    this.trainersService.updateTrainers(this.trainer).subscribe((data: any) => {

      this.getAllTrainers();
      this.trainer = new Trainers();
      this.trainer.role = new Designation();
    })
  }



  updateTrainersStatus(id: number, status: string) {
    console.log(status);

    this.trainersService.getTrainingByStatus(status, id).subscribe((data: any) => {
      this.getAllTrainers();
    });
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

    this.trainersService.searchTrainers(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.trainers = data.content;
      this.searching = new Trainers();
      this.searching.role = new Designation();
    })
  }


  /// pagination 
  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5, 10];

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
    this.getAllTrainers();
  }
  getId(id: any) {

  }
}
