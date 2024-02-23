import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { AssetsService } from 'src/app/services/assets.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { Assets } from 'src/app/entites/assets';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { UsersService } from 'src/app/services/users.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { min } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  providers: [DatePipe]
})
export class AssetsComponent implements OnInit {
  myForm: FormGroup;
  E: FormGroup;
   date = new Date
  todayDate = this.date.toISOString().slice(0,10)//this.datePipe.transform(new Date(),"yyyy-MM-dd")
   
  asset: Assets = new Assets();
  user: Users = new Users();
  assets: Assets[] = [];
  users: UserListResponse[] = [];
  isListView: any;

  searching: Assets = new Assets();


  ngOnInit(): void {
    this.getAllAssets();
    this.getAllUsers();
  }

  constructor(private builder: FormBuilder, private sweetAlertMessages: SweetAlertMessagesProvidersService,

    private datePipe: DatePipe, private assetsService: AssetsService, private userService: AdminUsersService) {
    this.myForm = this.builder.group({
      assetName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      supplier: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],

      assetWarrenty: ['', [Validators.required, Validators.pattern("^[0-9]$"), Validators.maxLength(1), Validators.maxLength(2)]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]{5}$"), Validators.minLength(4), Validators.maxLength(5)]],
       serialNumber: ['', [Validators.required, Validators.pattern("^[0-9]{3}$"), Validators.minLength(2), Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      model: ['', [Validators.required, Validators.pattern("^[A-E]{1}[0-9]{2}$"), Validators.maxLength(3), Validators.maxLength(25)]],

      condition: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      purchaseDate: ['', [Validators.required]],
      purchaseFromDate: ['', [Validators.required]],
      assetUser: ['', [Validators.required]],

      manufacturer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    })

    this.E = this.builder.group({
      assetName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      supplier: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],

      assetWarrenty: ['', [Validators.required, Validators.pattern("^[0-9]$"), Validators.maxLength(1), Validators.maxLength(2)]],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]{5}$"), Validators.minLength(4), Validators.maxLength(5)]],
       serialNumber: ['', [Validators.required, Validators.pattern("^[0-9]{3}$"), Validators.minLength(2), Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      model: ['', [Validators.required, Validators.pattern("^[A-E]{1}[0-9]{2}$"), Validators.maxLength(3), Validators.maxLength(25)]],

      condition: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      purchaseDate: ['', [Validators.required]],
      purchaseFromDate: ['', [Validators.required]],
      assetUser: ['', [Validators.required]],

      manufacturer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    })


    this.asset.assetUser = new Users();
    this.searching.assetUser = new Users();
  }
  minDate: any
  dateUpdate() {
    this.minDate = this.asset.purchaseDate
    console.log((this.minDate));
    
  }
  addForm(){
    this.myForm.reset();
  }
  // add assets
  addAssets() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }

    this.assetsService.addAssets(this.asset).subscribe((data: any) => {

      this.getAllAssets();
      this.asset = new Assets();
      this.asset.assetUser = new Users();
      this.sweetAlertMessages.alertMessage('success', 'Assets Created For Employee successfully.')
      AppUtils.modelDismiss('add');
    }, (err: any) => {
      console.log(err);
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    });

  }
  // get All assets list
  getAllAssets() {
    
    this.assetsService.getAllAssets(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.assets = data.content;
      this.length = data.totalElements;
    })
  }
  getAllUsers() {
    this.userService.getAllEmployees(this.pageIndex, 1000, 2).subscribe((data: any) => {
      this.users = data.content;


    })
  }


  confirm(id: any) {
    this.asset.id = id;
  }

  deleteAssets() {

    this.assetsService.deleteAssets(this.asset.id).subscribe((data: any) => {
      this.getAllAssets();
    })
  }

  setEditData(id: number) {
    this.assetsService.getAssetsByID(id).subscribe((data: any) => {
      this.asset = data;
    });

  }
  updateAssets() { AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }
    this.assetsService.updateAssets(this.asset).subscribe((data: any) => {
      this.asset = new Assets();
      this.asset.assetUser = new Users();
      this.sweetAlertMessages.alertMessage('success','Assets Update successfully.')
      AppUtils.modelDismiss('eadit');
      this.getAllAssets();

    })
  }

  updateAssetsStatus(id: number, status: string) {
    console.log(status);

    this.assetsService.updateAssetsStatus(status, id).subscribe((data: any) => {
      this.getAllAssets();
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

    this.assetsService.searchAssets(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.assets = data.content;

    })
  }





  /// pagination 
  deleteId = 0;
  length = 50;
  pageSize = 5;
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
    this.getAllAssets();
  }


}
function getAllUsers() {
  throw new Error('Function not implemented.');
}

