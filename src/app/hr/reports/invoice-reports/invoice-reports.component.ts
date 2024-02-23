import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Invoice } from 'src/app/entites/invoice';
import { Permissions } from 'src/app/entites/permissions';
import { AuthService } from 'src/app/services/auth.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-reports',
  templateUrl: './invoice-reports.component.html',
  styleUrls: ['./invoice-reports.component.scss']
})
export class InvoiceReportsComponent implements OnInit {


  constructor(private invoicesService: InvoicesService,
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
      this.length = data.totalElements
    })
  }



  filter() {
    console.log(this.searching);

    this.invoicesService.searchInvoice(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      console.log(data)
      this.invoiceList = data.content;
    })
  }
  setDeleteInvoice(id: number) {
    this.deleteId = id;
  }

  deleteInvoice() {
    console.log(this.deleteId)
    this.invoicesService.deleteInvoice(this.deleteId).subscribe((data: any) => {
      this.getAllInvoices();
    })
  }


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
    this.getAllInvoices();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }
}
