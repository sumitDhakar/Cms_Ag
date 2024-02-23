import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clients } from 'src/app/entites/clients';
import { Invoice } from 'src/app/entites/invoice';
import { InvoicesItems } from 'src/app/entites/invoices-items';
import { Projects } from 'src/app/entites/projects';
import { Taxes } from 'src/app/entites/taxes';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { ClientsService } from 'src/app/services/clients.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { TaxesService } from 'src/app/services/taxes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {


  invoice: Invoice = new Invoice();
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

        this.invoice.taxId = t;
      }
    });

  }


  optionSelected(inp: any) {
    this.clientService.getClientById(inp.value).subscribe((data: any) => {
      this.client = data;

      this.invoice.clientId.id = this.client.id;
      this.invoice.clientId.address = this.client.address;
      this.invoice.clientId.email = this.client.email;
      this.getAllProjectsbyClient(this.client.id);
    })
  }
  getAllProjectsbyClient(id: number) {

    this.projectService.getProjectByClientId(0, 10000, id).subscribe((data: any) => {
      this.projects = data.content;

    })
  }


  constructor(private taxesService: TaxesService, private clientService: ClientsService, private router: Router,
    private invoiceService: InvoicesService, private projectService: AdminProjectService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private activateRoute: ActivatedRoute) {
    this.invoice.clientId = new Clients();
    this.invoice.projectId = new Projects();
    this.invoice.taxId = new Taxes();
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param: any) => {
      this.invoice.id = param['id'];
      this.getInvoiceById();
    });
    this.getAllClients();
    this.getAllProject();
    this.getAllTaxes();
  }

  invoiceItemList: InvoicesItems[] = [new InvoicesItems()];
  getInvoiceById() {
    this.invoiceService.getInvoiceById(this.invoice.id).subscribe((data: any) => {
      this.invoice = data;
      this.invoiceItemList = this.invoice.invoicesItems;
      this.discount = this.invoice.discount;
    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Invoice Not Found " + err.error.status);

    })
  }

  addinvoiceItemList(): void {

    this.invoiceItemList.push(new InvoicesItems());


  }
  calculateResult() {
    this.invoiceItemList.forEach(t => {
      if (t.quantity < 1) {
        t.quantity = 1
      }
      let total = t.unitCost * t.quantity;
      t.total = total;
    })

  }
  removeItemList(index: number): void {
    if (this.invoiceItemList.length > 1) {
      this.invoiceItemList.splice(index, 1);
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
    this.invoiceItemList.forEach(t => {

      total += t.total;
    });

    // Calculate the tax in rupees over the total (assuming a percentage-based tax)
    let value: any = this.invoice.taxId.percentage;
    this.invoice.taxCost = (total * value) / 100;
    this.invoice.total = total + this.invoice.taxCost;
    // Calculate the discount amount
    if (discount) {

      this.discount = discount
      this.invoice.discountPercentage = this.discount;
      this.discount = (this.invoice.total * this.discount) / 100;
      this.confirm = true;
      // Calculate the grand total
      this.invoice.grandTotal = this.invoice.total - this.discount;
      // this.discount=0;
    }
  }


  getAllProject() {
    this.projectService.getAllProject(0, 1000).subscribe((data: any) => {
      this.projects = data.content;
    })
  }


  getAllTaxes() {
    this.taxesService.getAllTaxeByStatusActive(0, 1000).subscribe((data: any) => {
      this.taxes = data.content;
    })
  }

  updateInvoice() {
    this.invoice.invoicesItems = this.invoiceItemList;
    this.invoice.discount = this.discount;
    this.invoice.status = 'sent'
    this.invoiceService.updateInvoice(this.invoice).subscribe((data: any) => {
      this.invoice = new Invoice();
      this.invoice.invoicesItems = [];
      this.invoice.clientId = new Clients();
      this.invoice.projectId = new Projects();
      this.invoice.taxId = new Taxes();
      this.discount = 0;
      this.router.navigate(['/dollop/accounts/invoices']);
      this.sweetAlertMessages.alertMessage('success', 'Invoice Updated successfully.')

    },
      (error) => {
        // Handle other error statuses as needed
        this.sweetAlertMessages.alertMessage('error', "Error In Update Invoice" + error.error.status);
      }
    );

  }


}
