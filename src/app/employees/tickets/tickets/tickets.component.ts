import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Clients } from 'src/app/entites/clients';
import { TicketType } from 'src/app/entites/ticket-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tickets } from 'src/app/entites/tickets';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { ClientsService } from 'src/app/services/clients.service';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { TicketRequest } from 'src/app/payload/ticket-request';
import { AuthService } from 'src/app/services/auth.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ImageUtil } from 'src/app/payload/image-util';
import { Location } from '@angular/common';
import { AppUtils } from 'src/app/materials/utils/app-utils';

import { Permissions } from 'src/app/entites/permissions';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';



@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']

})
export class TicketsComponent implements OnInit {
  myForm: FormGroup;
  E: FormGroup;
 
  label: any;
  tickets: Tickets[] = [];
  clients: Clients[] = [];
  employees: UserListResponse[] = [];
  ticketsType: TicketType[] = [];
  searching: TicketRequest = new TicketRequest();

  addTicket: Tickets = new Tickets();

  labels: string[] = ["HighPriority", "MediumPriority", "LowPriority"];
  constructor(private ticketService: TicketsService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService,
    private clientService: ClientsService,
    private adminUserService: AdminUsersService,
    private ticketTypeService: TicketTypeService,
    
    private builder: FormBuilder,
    private location: Location) {
      this.E = this.builder.group({
         title: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
       
         requestedBy: ['', [Validators.required]],
         client: ['', [Validators.required]],
         ticketTypeId: ['', [Validators.required]],
        file: ['', [Validators.required]],
        labels: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
        }),
      this.myForm = this.builder.group({
        title: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
        requestedBy: ['', [Validators.required]],
        ticketTypeId: ['', [Validators.required]],
        file: ['', [Validators.required]],
        labels: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
     
         })

    this.addTicket.requestedBy = new Users();
    this.addTicket.client = new Clients();
    this.addTicket.ticketTypeId = new TicketType();

  }

addForm(){
  this.E.reset();
}

  ngOnInit(): void {
    this.getAllTickets();
    this.getAllClients();
    this.getAllEmployee();
    this.getAllTicketTypes();
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



  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();

  tStatics=[]
  getStaticsOfTicket() {
    this.ticketService.getTicketsStatics().subscribe((data: any) => {
      this.tStatics = data;
      this.setStaticsProgressOftickets();
    })
  }

  updateTicketsStatus(id: number, status: string, ofType: string) {
    this.ticketService.getticketByStatus(status, id, ofType).subscribe((data: any) => {
      this.getAllTickets();
    });
  }
  newTickets: number = 0;
  solvedtickets: number = 0;
  pendingTickets: number = 0;
  closedTickets: number = 0;

  setStaticsProgressOftickets() {
    if(this.tStatics!=undefined||this.tStatics>0){
    this.newTickets = this.giveCalculations(this.tStatics[1], this.tStatics[0]) || 0;
    this.solvedtickets = this.giveCalculations(this.tStatics[2], this.tStatics[0]) || 0;
    this.pendingTickets = this.giveCalculations(this.tStatics[3], this.tStatics[0]) || 0;
    this.closedTickets = this.giveCalculations(this.tStatics[4], this.tStatics[0]) || 0;}

  }
  giveCalculations(value: number, total: number): number {
    return Number(((value / total) * 100).toFixed(2));
  }
  addTickets() {
    AppUtils.formSubmittion(this.E);
    if (!this.E.valid) {
      //console.log("invalid");
      return;
    }

    this.ticketService.addTicket(this.addTicket).subscribe((data: any) => {
      this.getAllTickets();
      this.addTicket = new Tickets();
      this.addTicket.requestedBy = new Users();
      this.addTicket.client = new Clients();
      this.addTicket.ticketTypeId = new TicketType();
      this.addTicket.files = [];
      this.sweetAlertMessages.alertMessage('success', 'Ticket Added successfully.')
      AppUtils.modelDismiss('add');
    }, (err: any) => {
      console.log(err);
      this.sweetAlertMessages.alertMessage('question', "this ticket is already Exixt");
    });

  }


  ticket: Tickets = new Tickets();
  getTicketById(id: any) {
    this.ticketService.getTicketsById(id).subscribe((data: any) => {

      this.addTicket = data;
      this.addTicket.files = [];
      this.addTicket.ticketMembers = [];
    })
  }




  updateTickets() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }

    this.ticketService.updateTicket(this.addTicket).subscribe((data: any) => {
      this.getAllTickets();
      this.sweetAlertMessages.alertMessage('success', 'Ticket Updated successfully.')
       AppUtils.modelDismiss('Eadit');
    }, (err: any) => {
      console.log(err);
      this.sweetAlertMessages.alertMessage('question', "this ticket is already Exixt");
    });
  }


  selectedFile(event: any) {

    if (this.addTicket.ticketsFiles.filter(f => {
      return f.name == event.target.files[0].name;
    }).length == 0) {
      this.addTicket.files.push(event.target.files[0]);
    }

  }

  removeFile(file: any) {

    this.addTicket.files = this.addTicket.files.filter(f => {
      return f.name != file.name;
    })
  }




  getAllTicketTypes() {
    this.ticketTypeService.getAllTicketType(0, 1000).subscribe((data: any) => {
      this.ticketsType = data.content;

    });
  }



  getAllClients() {
    this.clientService.getAllClients(0, 1000).subscribe((data: any) => {
      this.clients = data.content;

    })
  }

  emId=2;
  getAllEmployee() {
    this.adminUserService.getAllEmployees(0, 10000,this.emId).subscribe((data: any) => {
      this.employees = data.content;
    })
  }

  sequence:any=0;
  getAllTickets() {
    this.ticketService.getAllTickets(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.tickets = data.content;
      this.getStaticsOfTicket();
      this.length = data.totalElements;
       this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  filter() {
    
    if ((!this.searching || !this.searching.assigned || this.searching.assigned === 0) &&
    (!this.searching|| !this.searching.createdAt|| this.searching.createdAt === 0)&&
    (!this.searching||!this.searching.createdBy||this.searching.createdBy===0)
    )
     {
  return;
    }


    this.ticketService.searchTickets(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.tickets = data.content;

    })
  }


  deleteTicket(id: number) {
    Swal.fire({
      title: "Do you want to delete the ticket?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      / Read more about isConfirmed, isDenied below /
      if (result.isConfirmed) {
        this.ticketService.deleteTickets(id).subscribe((data: any) => {
          this.getAllTickets();
          this.sweetAlertMessages.alertMessage('success', 'Ticket Deleted successfully.')
        }, (err) => {
          this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

        })
      } else if (result.isDenied) {
        this.sweetAlertMessages.alertMessage("info", "Changes are not saved")

      }
    });
  }




  // pagination

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];

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
    this.getAllTickets();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

}
