import { Location } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Expenses } from 'src/app/entites/expenses';
import { ExpensesFiles } from 'src/app/entites/expenses-files';
import { Permissions } from 'src/app/entites/permissions';
import { Users } from 'src/app/entites/users';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-expenses-report',
  templateUrl: './expenses-report.component.html',
  styleUrls: ['./expenses-report.component.scss']
})
export class ExpensesReportComponent implements OnInit {

  expense: Expenses = new Expenses();
  users: UserListResponse[] = [];
  expenses: Expenses[] = [];

  searching: Expenses = new Expenses();
  imageUrl = environment.hostUrl+ '/auth/file/getImageApi/UserProfile/';
  constructor(private expensesService: ExpensesService,
    private authService:AuthService,
    private location :Location,
     private userService: AdminUsersService) {

    this.expense.userId = new Users();
    this.searching.userId= new Users();

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
      this.expense.expensesFiles=data.expensesFiles;
      //  this.expensesFiles=data.expensesFiles;
      
    });

  }

  updateExpenses() {

    this.expensesService.updateExpenses(this.expense).subscribe((data: any) => {
      this.expense=new Expenses();
      this.expense.expensesFiles=[];
      this.expense.userId = new Users();
      this.getAllExpenses();

    })
  }

  getAllUsers() {
    this.userService.getAllEmployees(0, 1000,2).subscribe((data: any) => {
      this.users = data.content;
    })
  }


  filter() {
//this.searching.userId=new Users()
console.log(this.searching);
  
this.expensesService.searchExpenses(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.expenses = data.content;
      console.log( data.content);
      
    })
  }
  confirm(id: number) {
    this.deleteId = id;
  }

  deleteExpenses() {
    this.expensesService.deleteExpenses(this.deleteId).subscribe((data: any) => {
     this.deleteId=0;
      this.getAllExpenses();
    })
  }

  expensesFiles:ExpensesFiles[]=[]
  addExpenses() {

    this.expensesService.addExpenses(this.expense).subscribe((data: any) => {
   this.expense=new Expenses();
   this.expense.expensesFiles=[];
   this.expense.userId = new Users();
  });
  this.getAllExpenses();
  }




  updateStatus(id: number, status: string) {
    // this.expense.expensesFiles=this.expensesFiles;
    this.expensesService.updateExpensesStatus(id, status).subscribe((data: any) => {
      this.getAllExpenses();
  });
  }




  deleteId = 0;

  // pagination

  length = 50;
  pageIndex = 0;
  pageSize=10;
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

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








}




