
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/app/entites/clients';
import { EstimateItems } from 'src/app/entites/estimate-items';
import { Estimates } from 'src/app/entites/estimates';
import { Invoice } from 'src/app/entites/invoice';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { Taxes } from 'src/app/entites/taxes';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { EstimatesService } from 'src/app/services/estimates.service';
import { TaxesService } from 'src/app/services/taxes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-estimate',
  templateUrl: './edit-estimate.component.html',
  styleUrls: ['./edit-estimate.component.scss']
})
export class EditEstimateComponent implements OnInit {


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
    private authService: AuthService, private location: Location,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private estimateService: EstimatesService, private projectService: AdminProjectService, private activateRoute: ActivatedRoute) {
    this.estimate.clientId = new Clients();
    this.estimate.projectId = new Projects();
    this.estimate.taxeId = new Taxes();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param: any) => {
      this.estimate.id = param['id'];
      this.getEstimateById();
    });
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

  getEstimateById() {
    this.estimateService.getEstimatesById(this.estimate.id).subscribe((data: any) => {
      this.estimate = data;
      this.estimateItemList = this.estimate.estimateItems;
      this.discount = this.estimate.discountPercentage;
    })
  }

  addinvoiceItemList(): void {

    this.estimateItemList.push(new EstimateItems());
  }


  calculateResult() {
    this.estimateItemList.forEach(t => {
      if (t.quantity < 1) {
        t.quantity = 1
      }
      let total = t.unitCost * t.quantity;
      t.total = total;
    })

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
  ItemListAdded(discount?: number) {
    this.calculateResult();
    this.confirm2 = true;
    let total = 0;
    this.estimateItemList.forEach(t => {

      total += t.total;
    });

    // Calculate the tax in rupees over the total (assuming a percentage-based tax)
    let value: any = this.estimate.taxeId.percentage;
    this.estimate.taxCost = (total * value) / 100;
    this.estimate.total = total + this.estimate.taxCost;
    // Calculate the discount amount
    if (discount) {
      this.discount = discount
      this.estimate.discountPercentage = this.discount;

      this.discount = (this.estimate.total * discount) / 100;
      this.confirm = true;
      // Calculate the grand total
      this.estimate.grandTotal = this.estimate.total - this.discount;
    }
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

  updateEstimate() {
    this.estimate.discount = this.discount
    this.estimate.estimateItems = this.estimateItemList;

    this.estimateService.updateEstimates(this.estimate).subscribe((data: any) => {
      this.estimate = new Estimates();
      this.discount = 0;
      this.estimate.estimateItems = [];
      this.estimate.clientId = new Clients();
      this.estimate.projectId = new Projects();
      this.estimate.taxeId = new Taxes();
      this.router.navigate(['/dollop/accounts/estimates']);
      this.sweetAlertMessages.alertMessage('success', 'Estimate Updated  successfully.')

    },
      (error) => {
        // Handle other error statuses as needed
        this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + error.error.status);
      }
    );

  }


}

