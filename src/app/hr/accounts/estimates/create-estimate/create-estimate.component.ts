import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clients } from 'src/app/entites/clients';
import { EstimateItems } from 'src/app/entites/estimate-items';
import { Estimates } from 'src/app/entites/estimates';
import { Invoice } from 'src/app/entites/invoice';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { Taxes } from 'src/app/entites/taxes';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { EstimatesService } from 'src/app/services/estimates.service';
import { TaxesService } from 'src/app/services/taxes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-estimate',
  templateUrl: './create-estimate.component.html',
  styleUrls: ['./create-estimate.component.scss'],
  providers:[DatePipe]
})
export class CreateEstimateComponent implements OnInit {

  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  estimate: Estimates = new Estimates();
  invoices: Invoice[] = []
  client: Clients = new Clients();
  clients: Clients[] = [];

  project: Projects = new Projects();

  projects: Projects[] = [];

  taxes: Taxes[] = [];

  id = 0;

  optionselecedt(inp: any) {

    this.id = inp;
    this.taxes.forEach(t => {

      if (t.id == this.id) {

        this.estimate.taxeId = t;
      }
    });

  }


  optionSelected(inp: any) {
    this.clientService.getClientById(inp.value).subscribe((data: any) => {
      this.client = data;

      this.estimate.clientId.id = this.client.id;
      this.estimate.clientId.address = this.client.address;
      this.estimate.clientId.email = this.client.email;
      this.getAllProjectsbyClient(this.client.id);
    })
  }
  getAllProjectsbyClient(id: number) {

    this.projectService.getProjectByClientId(0, 10000, id).subscribe((data: any) => {

      this.projects = data.content;

    })
  }



  constructor(private taxesService: TaxesService, private clientService: ClientsService, private router: Router,
    private estimateService: EstimatesService, private projectService: AdminProjectService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,private datePipe:DatePipe,
    private location: Location, private authService: AuthService) {
    // this.myForm = this.fb.group({
    //   id: ["", [Validators.required ]],
    //  projectId: ["", [Validators.required ]],
    //   idT: ["", [Validators.required ]],
    //   email: ["", [Validators.required ]],
    //   address: ["", [Validators.required ,Validators.pattern(/^([A-Z]{1}[a-z]*\s*)+$/),Validators.minLength(5),Validators.maxLength(25)]],
    //   billDate: ["", [Validators.required ]],
    //   dueDate: ["", [Validators.required]],
    // title: ["", [Validators.required ,Validators.pattern(/^([A-Z]{1}[a-z]*\s*)+$/),Validators.minLength(3),Validators.maxLength(25)]],
    // description: ["", [Validators.required ,Validators.pattern(/^([A-Z]{1}[a-z]*\s*)+$/),Validators.minLength(3),Validators.maxLength(25)]],
    // unitCost: ["", [Validators.required ]],
    // quantity: ["", [Validators.required ]],
    // discount: ["", [Validators.required ]],
    //   note: ["", [Validators.required ,Validators.pattern(/^([A-Z]{1}[a-z]*\s*)+$/),Validators.minLength(2),Validators.maxLength(25)]],

    // });
    this.estimate.clientId = new Clients();
    this.estimate.projectId = new Projects();
    this.estimate.taxeId = new Taxes();
  }

  ngOnInit(): void {
    this.getAllClients();
    this.getAllProject();
    this.getAllTaxes();
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


  estimateItemList: EstimateItems[] = [new EstimateItems()];

  addinvoiceItemList(): void {
    if (this.isValidItem())
    this.estimateItemList.push(new EstimateItems());
    else
         this.sweetAlertMessages.alertMessage('error',"First Give All Given Values"); 
  } 

  isValidItem(): boolean {
    // Implement your validation logic here
    // Check if any of the fields in the last item in the list is null, empty, or less than 0
    const lastItem = this.estimateItemList[this.estimateItemList.length - 1];
    
    return (
        lastItem.title && // Check if title is not null or empty
        lastItem.description && // Check if description is not null or empty
        lastItem.unitCost !== null && lastItem.unitCost > 0 && // Check if unitCost is not null or less than 0
        lastItem.quantity !== null && lastItem.quantity > 0 // Check if quantity is not null or less than 0
    );
  }


  removeItemList(index: number): void {
    if (this.estimateItemList.length > 1) {
      this.estimateItemList.splice(index, 1);
    }
  }

  getAllClients() {
    this.clientService.getAllClients(0, 100000).subscribe((data: any) => {
      this.clients = data.content;
    })

  }


  confirm: boolean = false;
  confirm2: boolean = false;
  discount = 0;
  
  ItemListAdded(discount: number = 0) {
    if( this.estimate.taxeId.id == 0 && !discount){
   this.sweetAlertMessages.alertMessage('info','select Taxe First')
    }
    else if(this.estimate.taxeId.id != 0 ){

    
      this.calculateResult();
      this.confirm2 = true;
  
      const total = this.estimateItemList.reduce((acc, item) => acc + item.total, 0);
  
      // Calculate the tax in rupees over the total (assuming a percentage-based tax)
      let taxPercentage:any = this.estimate.taxeId.percentage;
      this.estimate.taxCost = (total * taxPercentage) / 100;
      this.estimate.total = total + this.estimate.taxCost;
  
      // Calculate the discount amount
      if (discount) {
        this.discount = discount;
        this.estimate.discountPercentage = this.discount;
        this.discount = (this.estimate.total * this.discount) / 100;
        this.confirm = true;
        this.estimate.grandTotal = this.estimate.total - this.discount;
    }
    }
   
  }
  
  calculateResult() {
      this.estimateItemList.forEach(t => {
          t.quantity = Math.max(t.quantity, 1);
          t.total = t.unitCost * t.quantity;
      });
  }
  

  getAllProject() {
    this.projectService.getAllProject(0, 100).subscribe((data: any) => {
      this.projects = data.content;
      console.log(data);

    })
  }
  getAllTaxes() {
    this.taxesService.getAllTaxeByStatusActive(0, 1000).subscribe((data: any) => {
      this.taxes = data.content;
    })
  }

  addInvoice() {
    this.estimate.estimateItems = this.estimateItemList;
    this.estimate.discount = this.discount;
    // AppUtils.formSubmittion(this.myForm);
    // if (!this.myForm.valid) {
    //   //console.log("invalid");
    //   return;
    // }

    this.estimateService.addEstimates(this.estimate).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Estimate is Created",
      }).then(e => {
        // this.discount = 0;
        this.estimate = new Estimates();
        this.estimate.estimateItems = [];
        this.estimate.clientId = new Clients();
        this.estimate.projectId = new Projects();
        this.estimate.taxeId = new Taxes();
        this.estimateItemList = [];
        this.sweetAlertMessages.alertMessage('success', 'Estimate Created successfully.')
        this.router.navigate(['/dollop/accounts/estimates']);
        AppUtils.modelDismiss('add');
      });


    },
      (error) => {
        // Handle other error statuses as needed
        this.sweetAlertMessages.alertMessage('error', "Error Occured In Create Estimate" + error.error.status);

      }
    );

  }


}
