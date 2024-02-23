import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Clients } from 'src/app/entites/clients';
import { EstimateItems } from 'src/app/entites/estimate-items';
import { Estimates } from 'src/app/entites/estimates';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { Taxes } from 'src/app/entites/taxes';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { EstimatesService } from 'src/app/services/estimates.service';

@Component({
  selector: 'app-estimate-view',
  templateUrl: './estimate-view.component.html',
  styleUrls: ['./estimate-view.component.scss']
})
export class EstimateViewComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;


  constructor(private estimateService: EstimatesService, 
       private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private location: Location
  ) {
    this.estimate.clientId = new Clients();
    this.estimate.projectId = new Projects();
    this.estimate.taxeId = new Taxes();

  }


  estimate: Estimates = new Estimates();
  estimateItemList: EstimateItems[] = [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.estimate.id = param['id'];
      this.getEstimateById();
    })
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

  // get user by id
  getEstimateById() {
    this.estimateService.getEstimatesById(this.estimate.id).subscribe((data: any) => {
      this.estimate = data;
      this.estimateItemList = this.estimate.estimateItems;

    },(err)=>{
      this.sweetAlertMessages.alertMessage('error',"Estimate Not Found " +err.error.status); 

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
      pdf.save(this.estimate.clientId.companyName + '.pdf'); // Download the PDF
    });
  }



  exportToCSV() {
    const csvContent = this.convertToCSV(this.estimateItemList);
    this.downloadCSV(csvContent, this.estimate.clientId.firstName + "_InvoiceItem" + '.csv');
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

