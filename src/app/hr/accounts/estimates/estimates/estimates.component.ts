import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Estimates } from 'src/app/entites/estimates';
import { Invoice } from 'src/app/entites/invoice';
import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { EstimatesService } from 'src/app/services/estimates.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.scss']
})
export class EstimatesComponent implements OnInit {


  constructor(private estimateService: EstimatesService,
    private fb: FormBuilder,
    private authService: AuthService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private location: Location) {
  }

  ngOnInit(): void {
    this.getAllEstimateList();
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


  pageNo = 0;
  deleteId = 0;

  estimate: Estimates = new Estimates();
  estimateList: Estimates[] = [];
  searching: Estimates = new Estimates();



  getAllEstimateList() {
    this.estimateService.getAllEstimates(this.pageIndex, this.pageSize).subscribe((data: any) => {

      this.estimateList = data.content;
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

    this.estimateService.searchExpenses(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {

      this.estimateList = data.content;
      console.log(data.content)
    })
  }
  setDeleteInvoice(id: number) {
    this.deleteId = id;
  }

  deleteInvoice() {
    this.estimateService.deleteExpenses(this.deleteId).subscribe((data: any) => {
      this.getAllEstimateList();
      this.sweetAlertMessages.alertMessage('success', 'Estimate Deleted successfully.')

    })
  }



  // pagination

  length = 50;
  pageSize = 10;
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
    this.getAllEstimateList();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

}

