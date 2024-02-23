import { DatePipe, Location } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as saveAs from 'file-saver';
import { Expenses } from 'src/app/entites/expenses';
import { ExpensesFiles } from 'src/app/entites/expenses-files';
import { Permissions } from 'src/app/entites/permissions';
import { Users } from 'src/app/entites/users';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers:[DatePipe]

})
export class ExpensesComponent implements OnInit {
  myForm: FormGroup;
  E: FormGroup;
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  expense: Expenses = new Expenses();
  users: UserListResponse[] = [];
  expenses: Expenses[] = [];

  searching: Expenses = new Expenses();
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  constructor(private expensesService: ExpensesService,private builder: FormBuilder,private datePipe:DatePipe,
    private authService: AuthService,
    private location: Location, private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private userService: AdminUsersService) {this.myForm = this.builder.group({
      title: ['', [Validators.required,  Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      expenseDate: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      amount: ['', [Validators.required,Validators.pattern(/^[0-20]\d*$/), Validators.min(100), Validators.max(100000)]],
      paidBy: ['', [Validators.required]],
      file: ['', [Validators.required]],
        
    })
     this.E= this.builder.group({
      title: ['', [Validators.required,  Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      expenseDate: ['', [Validators.required]],
      userId: ['', [Validators.required]],
      amount: ['', [Validators.required,Validators.pattern(/^[0-20]\d*$/), Validators.min(100), Validators.max(100000)]],
      paidBy: ['', [Validators.required]],
      file: ['', [Validators.required]],
       
    }),

    this.expense.userId = new Users();
    this.searching.userId = new Users();

  }


  ngOnInit(): void {
    this.getAllExpenses();
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



  add() {
  }

  selectedFile(event: any) {

    if (this.expense.expensesFiles.filter(f => {
      return f.name == event.target.files[0].name;
    }).length == 0) {

      this.expense.expensesFiles.push(event.target.files[0]);
    }

  }

  removeFile(file: any) {
    this.expense.expensesFiles = this.expense.expensesFiles.filter(f => {
      return f.name != file.name;
    })
  }


  getAllExpenses() {

    this.expensesService.getAllExpenses(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.expenses = data.content;
      this.length = data.totalElements;

    })
  }



  setEditData(id: number) {
    this.expensesService.getExpensesById(id).subscribe((data: any) => {
      this.expense = data;
      this.expense.expensesFiles = data.expensesFiles;

    });

  }

  updateExpenses() {
    // AppUtils.formSubmittion(this.E);
    // if (!this.E.valid) {
    //   //console.log("invalid");
    //   return;
    // }

    this.expensesService.updateExpenses(this.expense).subscribe((data: any) => {
      this.expense = new Expenses();
      this.expense.expensesFiles = [];
      this.expense.userId = new Users();
      this.getAllExpenses();
      this.sweetAlertMessages.alertMessage('success', 'Estimate Update successfully.')
      AppUtils.modelDismiss('Eadit');
    
    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

    });
  
    
  }

  getAllUsers() {
    this.userService.getAllEmployees(0, 1000,2).subscribe((data: any) => {
      this.users = data.content;
    })
  }


  filter() {
    
    if ((!this.searching || !this.searching.title || this.searching.title.trim() === '') &&
    
    (!this.searching.userId.id|| !this.searching.userId.id|| this.searching.userId.id === 0)&&
    (!this.searching || !this.searching.paidBy || this.searching.paidBy.trim() === '')
    )
     {
  return;
    }

    this.expensesService.searchExpenses(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.expenses = data.content;

    })
  }
  confirm(id: number) {
    this.deleteId = id;
  }

  deleteExpenses() {
    this.expensesService.deleteExpenses(this.deleteId).subscribe((data: any) => {
      this.deleteId = 0;
      this.getAllExpenses();
      this.sweetAlertMessages.alertMessage('success', 'Expenses Deleted successfully.')

    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

    })
  }

  expensesFiles: ExpensesFiles[] = []
  addExpenses() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }

    this.expensesService.addExpenses(this.expense).subscribe((data: any) => {
      this.expense = new Expenses();
      this.expense.expensesFiles = [];
      this.expense.userId = new Users();
      this.getAllExpenses();
      this.sweetAlertMessages.alertMessage('success', 'Expense Created successfully.')
      AppUtils.modelDismiss('add');
    
    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

    });
  }




  updateStatus(id: number, status: string) {
    // this.expense.expensesFiles=this.expensesFiles;
    this.expensesService.updateExpensesStatus(id, status).subscribe((data: any) => {
      this.getAllExpenses();
      this.sweetAlertMessages.alertMessage('success', 'Expenses Status Changed Successfully.')

    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

    });
  }




  deleteId = 0;

  // pagination

  length = 50;
  pageSize = 10;
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
    this.getAllExpenses();
  }




  isListView = false;

  changeView(value: boolean) {
    this.isListView = value;
  }

  imageData = new Map<string, any>();
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };




  createImageFromBlob(fileName: string, image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageData.set(fileName, reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }







  download(id: number, fileName: string) {
    this.expensesService.downloadFile(id).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event, fileName);

      }
    )
  }

  reportProgress(event: HttpEvent<string[] | Blob>, fileName: string) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.updateFileStatus(event.loaded, event.total!, 'uploading....')
        break;
      case HttpEventType.DownloadProgress:
        this.updateFileStatus(event.loaded, event.total!, 'Downloading...')
        break;
      case HttpEventType.ResponseHeader:
        console.log('header returned', event);
        break;
      case HttpEventType.Response:
        if (event.body instanceof Array) {
          for (const fileName of event.body) {
            // push in array
          }
        } else
          saveAs(new File([event.body!], fileName,
            { type: `${event.headers.get('Content-Type')};charset=utf-8` }

          ))
        console.log(event.headers.get('File-Name'));
        //  saveAs(new Blob([event.body!],
        //   {type:`${event.headers.get('Content-Type')};charset=utf-8`}),
        //   event.headers.get('File-Name'));
        break;
      default:
        console.log(event);


    }
  }
  updateFileStatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'Progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total!);

  }


}



