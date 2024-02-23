import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/entites/invoice';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Clients } from 'src/app/entites/clients';
import { Projects } from 'src/app/entites/projects';
import { Taxes } from 'src/app/entites/taxes';
import { InvoicesItems } from 'src/app/entites/invoices-items';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
//import html2canvas from 'html2canvas';


@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;


  constructor(private invoiceService: InvoicesService, private activateRoute: ActivatedRoute,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,

  ) {
    this.invoice.clientId = new Clients();
    this.invoice.projectId = new Projects();
    this.invoice.taxId = new Taxes();

  }


  invoice: Invoice = new Invoice();
  invoiceItemList: InvoicesItems[] = [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.invoice.id = param['id'];
      this.getInvoiceToView();
    })
  }

  // get user by id
  getInvoiceToView() {
    this.invoiceService.getInvoiceById(this.invoice.id).subscribe((data: any) => {
      this.invoice = data;
      this.invoiceItemList = this.invoice.invoicesItems;

    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured Invoice Not Found " + err.error.status);
    })
  }

  generatePDF() {
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.invoice.clientId.companyName + '.pdf'); // Download the PDF
    });
  }



  exportToCSV() {
    const csvContent = this.convertToCSV(this.invoiceItemList);
    this.downloadCSV(csvContent, this.invoice.clientId.firstName + "_InvoiceItem" + '.csv');
  }

  convertToCSV(data: any[]) {
    const header = Object.keys(data[0]).join(',');
    const csv = data.map(item => Object.values(item).join(','));
    return [header, ...csv].join('\n');
  }

  downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename; a.click();
    window.URL.revokeObjectURL(url);
  }


}

