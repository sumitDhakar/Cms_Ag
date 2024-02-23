import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Holidays } from 'src/app/entites/holidays';
import { Permissions } from 'src/app/entites/permissions';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { HolidayService } from 'src/app/services/holiday.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  providers: [DatePipe]
})
export class HolidaysComponent implements OnInit {

  todayDates = this.datePipe.transform(new Date(), "yyyy-MM-dd")

  holiday: Holidays = new Holidays();
  holidays: Holidays[] = [];
  todayDate: String = new Date().toLocaleDateString();
  deleteId = 0;
  myForm: FormGroup;
  sequence: any = 0;
  ngOnInit(): void {
    this.getAllHolidays();
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


  constructor(private holidayService: HolidayService, private datePipe: DatePipe,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private fb: FormBuilder, private authService: AuthService, private location: Location) {
    this.myForm = this.fb.group({
      title: ["", [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3)]],
      holidayDate: ["", [Validators.required]]
    });

  }

  addForm() {
    this.myForm.reset();
  this.holiday = new Holidays();
  }


  // get All holiday list
  getAllHolidays() {
    this.holidayService.getAllHolidays(this.pageIndex, this.pageSize).subscribe((data: any) => {
      console.log(data);
      this.holidays = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
    })
  }

  // add holiday
  addHoliday() {
    if (this.myForm.valid) {
      this.holidayService.addHoliday(this.holiday).subscribe(data => {
        this.getAllHolidays();
        this.holiday = new Holidays();
        this.sweetAlertMessages.alertMessage('success', 'Holiday added successfully.')
        AppUtils.modelDismiss('add');

        this.myForm.reset();
      }, (err) => {
        if (err.status == 400)
          this.sweetAlertMessages.alertMessage('error', 'Holiday Field  are not correct.')

        if (err.error.status == 409)
          this.sweetAlertMessages.alertMessage('error', err.error.message);
        // if(err.error.status == 0)
        // this.sweetAlertMessages.alertMessage("error",err.error.message) ;


        else
          this.sweetAlertMessages.alertMessage("error", err.error.status)
      }
      )
    }
    else {
      return
    }
  }


  getfetchDetailsHoildayes(){
    this.holidayService.fetchDetailsHoildayes().subscribe((data:any)=>{
       this.holidayService = data;
      
       console.log(data);
       
    });
  }

  // set data for edit
  setHolidayData(id: number) {
    this.holidayService.getHolidaysById(id).subscribe((data: any) => {
      this.holiday = data;
    })
  }

  // update Holiday 
  updateHoliday() {
    this.holidayService.updateHoliday(this.holiday).subscribe((data: any) => {
      this.holiday = data;
      this.sweetAlertMessages.alertMessage('success', 'Holiday updated successfully.')
      this.getAllHolidays();
      this.holiday = new Holidays();

    }, (err) => {
      if (err.status == 400)
        this.sweetAlertMessages.alertMessage('error', 'Holiday Field  are not correct.')

      if (err.error.status > 0)
        this.sweetAlertMessages.alertMessage('error', err.error.message);
         else
        this.sweetAlertMessages.alertMessage("error", err.error.message)
 
    })
  }
  // delete holiday
  deleteHoliday() {
    this.holidayService.deleteHoliday(this.deleteId).subscribe(data => {
      this.getAllHolidays();
      this.sweetAlertMessages.alertMessage('success', 'Holiday Deleted successfully.')
    })

    this.deleteId = 0;
  }
  // setting id for delete
  deleteConfirm(id: any) {
    this.deleteId = id;
  }


  /// pagination 
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];

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
    this.getAllHolidays();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }


}



