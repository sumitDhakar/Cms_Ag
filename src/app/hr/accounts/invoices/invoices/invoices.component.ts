import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Invoice } from 'src/app/entites/invoice';
import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {


  constructor(private invoicesService: InvoicesService, private fb: FormBuilder,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private location: Location, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllInvoices();
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


  deleteId = 0;


  invoiceList: Invoice[] = [];

  searching: Invoice = new Invoice();




  getAllInvoices() {
    this.invoicesService.getAllInvoice(this.pageIndex, this.pageSize).subscribe((data: any) => {

      this.invoiceList = data.content;
      this.length = data.totalElements;
    })
  }



  filter() {


    if ((!this.searching || !this.searching.dueDate || this.searching.dueDate === 0) &&
    
    (!this.searching|| !this.searching.billDate|| this.searching.billDate === 0)
    )
     {
  return;
    }


    this.invoicesService.searchInvoice(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      console.log(this.searching.billDate);
      
      this.invoiceList = data.content;
      this.length=data.totalElements;
    })
  }
  setDeleteInvoice(id: number) {
    this.deleteId = id;
  }

  deleteInvoice() {
    this.invoicesService.deleteInvoice(this.deleteId).subscribe((data: any) => {
      this.getAllInvoices();
      this.sweetAlertMessages.alertMessage('success', 'Invoice Deleted successfully.')
    },err=>{
      this.sweetAlertMessages.alertMessage('error',"Error Occured In Delete Invoice" +err.error.status); 
    })
  }


   
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
    this.getAllInvoices();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }
  }


  


