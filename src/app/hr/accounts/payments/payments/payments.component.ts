import { DatePipe, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Invoice } from 'src/app/entites/invoice';
import { InvoicePayments } from 'src/app/entites/invoice-payments';
import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { InvoicePaymentsService } from 'src/app/services/invoice-payments.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [DatePipe]

})
export class PaymentsComponent implements OnInit {


  today=this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  myForm: FormGroup;

  invoice: Invoice = new Invoice();
  invoices: Invoice[] = []
  invoicePayment: InvoicePayments = new InvoicePayments();
  invoicePayments: InvoicePayments[] = []

  isListView: any;
  constructor(private location: Location, private fb: FormBuilder,
    private datePipe:DatePipe,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService,
    private invoicePaymentsService: InvoicePaymentsService,
    private invoiceService: InvoicesService,
    private cdr: ChangeDetectorRef) {

      
	 
      this.myForm = this.fb.group({
        id: ["", [Validators.required ]],
       status: ["", [Validators.required]],
       paymentDate: ["", [Validators.required]],
        amount: ["", [Validators.required,Validators.min(0) ]],
        note: ["", [Validators.required ]],
        
      }),  
    this.invoicePayment.invoiceId = new Invoice();
  }


  ngOnInit(): void {
    this.getAllInvoices();
    this.getAllInvoicePayments();
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





  addInvoicePayments() {
      AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }

    this.invoicePaymentsService.addInvoicePayments(this.invoicePayment).subscribe((data: any) => {
      
      this.invoicePayment = new InvoicePayments();
      this.invoicePayment.invoiceId = new Invoice();
      this.getAllInvoicePayments();
      this.sweetAlertMessages.alertMessage('success', 'Invoice Payment Created successfully.')
      AppUtils.modelDismiss('add');
   
    },err=>{
      if(err.error.status==404)
      this.sweetAlertMessages.alertMessage('error',"Invoice Not Found"); 
      else if(err.error.status==409)
      this.sweetAlertMessages.alertMessage('error',"Invoice payment Should Be Less Or Equal Amount To BePaid Or On Current Date Only."); 
      else if(err.status==302)
      this.sweetAlertMessages.alertMessage('error',err.messages); 

    });
  }




  optionSelected(inp: any) {
    this.invoiceService.getInvoiceById(inp.value).subscribe((data: any) => {
      this.invoice = data;

      this.invoicePayment.invoiceId.id = this.invoice.id;
      this.invoicePayment.amount = this.invoice.grandTotal - this.invoice.paidAmount;
      // this.invoice.clientId.email = this.client.email;
     alert( this.invoicePayment.amount)

    })

  }



  getAllInvoices() {

    this.invoiceService.getAllInvoice(0, 10000).subscribe((data: any) => {

      this.invoices = data.content;

    })
  }





  getAllInvoicePayments() {
    this.invoicePaymentsService.getAllInvoicePayments(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.invoicePayments = data.content;
      this.length = data.totalElements;
    })
  }

  setEditData(id: number) {
    this.invoicePaymentsService.getInvoicePaymentsByID(id).subscribe((data: any) => {
      this.invoicePayment = data;
      console.log(data);
    });

  }

  updateInvoicePayments() {
    this.invoicePaymentsService.updateInvoicePayments(this.invoicePayment).subscribe((data: any) => {

      this.getAllInvoicePayments();
      this.sweetAlertMessages.alertMessage('success', 'Invoice Payment Data  Updated successfully.')

    },err=>{
      this.sweetAlertMessages.alertMessage('error',"Error Occured In Delete" +err.error.status); 
    })
  }


  changeView() {
    if (!this.isListView)
      this.isListView = true
    else
      this.isListView = false
  }

  deleteId = 0;
  confirm(id: any) {
    this.deleteId = id;
  }
  deleteInvoicePayments() {
    this.invoicePaymentsService.deleteInvoicePayments(this.deleteId).subscribe((data: any) => {
      this.getAllInvoicePayments();
    
      this.sweetAlertMessages.alertMessage('success', 'Invoice Payment  Deleted successfully.')

    },err=>{
      this.sweetAlertMessages.alertMessage('error',"Error Occured In Delete payment " +err.error.status); 

    })
  }

  // pagination
  pageSize = 10
  length = 50;
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
    this.getAllInvoicePayments();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

}
