import { Location } from '@angular/common';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Clients } from 'src/app/entites/clients';
import { Permissions } from 'src/app/entites/permissions';
import { ProjectMembers } from 'src/app/entites/project-members';
import { Projects } from 'src/app/entites/projects';
import { Tickets } from 'src/app/entites/tickets';
import { TicketsMember } from 'src/app/entites/tickets-member';
import { Users } from 'src/app/entites/users';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { ImageUtil } from 'src/app/payload/image-util';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { AdminProjectFileService } from 'src/app/services/admin/admin-project-file.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { TicketsMemberService } from 'src/app/services/admin/tickets-member.service';
import { AuthService } from 'src/app/services/auth.service';
import { TicketsService } from 'src/app/services/tickets.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };

  constructor(private activateRoute: ActivatedRoute,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private router: Router,
    private viewTicketService: TicketsService,
    private fileService: AdminProjectFileService,
    private ticketsMemberService: TicketsMemberService,
    private authService: AuthService,
    private location: Location,
    private adminUserService: AdminUsersService,) {
    this.ticket.requestedBy == new Users();
    this.ticket.createdBy = new Users();
    this.ticket.client = new Clients();
  }

  ticket: Tickets = new Tickets();
  employees: UserListResponse[] = [];
  selectedTicketsMembers: Map<any, boolean> = new Map<any, boolean>();
  baseRoute = 'employee-dash'
  ticketsMembers: TicketsMember[] = [];
  member = new TicketsMember();
  fileId = 0;
  label: string = '';
  labels: string[] = ["HighPriority", "Urgent", "Perfect", "OnTrack", "Upcoming"]

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.ticket.id = param['tId'];
    });

    this.getTicketById();
    this.getAllEmployees();
    this.setPermissions();
    this.setBaseUrl();
    this.getTicketsMemberByTicketId();
  }



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

  getTicketsMemberByTicketId() {
    this.ticketsMemberService.getTicketsMemberByTicketsId(0, 2000, this.ticket.id).subscribe((data: any) => {
      this.ticketsMembers = data.content;

    })
  }


  getAllEmployees() {

    this.adminUserService.getAllEmployees(0, 2000,2).subscribe((data: any) => {
      this.employees = data.content;
    })
  }


  getTicketById() {
    this.viewTicketService.getTicketsById(this.ticket.id).subscribe((data: any) => {
      this.ticket = data;
      this.ticket.files = [];
      this.ticket.images.forEach(f => {
        this.viewTicketService.downloadTicketFileIamges(f.id).subscribe(event => {
          if (event.type == HttpEventType.Response)
            this.createImageFromBlob(f.originalName, event.body!)
        })
      })
    })
  }



  download(id: number, fileName: string) {
    this.viewTicketService.downloadFileInFolder(id).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event, fileName);

      }
    )
  }

  reportProgress(event: HttpEvent<string[] | Blob>, fileName: string) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(event.loaded, event.total!, 'uploading....')
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(event.loaded, event.total!, 'Downloading...')
        break;
      case HttpEventType.ResponseHeader:
        console.log('header returned', event);
        break;
      case HttpEventType.Response:
        if (event.body instanceof Array) {
          for (const fileName of event.body) {
            // push in array
          }
        } else
          saveAs(new File([event.body!], fileName,
            { type: `${event.headers.get('Content-Type')};charset=utf-8` }

          ))
        console.log(event.headers.get('File-Name'));
        break;
      default:
        console.log(event);


    }
  }
  updateStatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'Progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total!);

  }



  imageData = new Map<string, any>();

  createImageFromBlob(fileName: string, image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageData.set(fileName, reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  selectedFile(event: any) {

    if (this.ticket.ticketsFiles.filter(f => {
      return f.name == event.target.files[0].name;
    }).length == 0) {
      this.ticket.files.push(event.target.files[0]);
    }

  }

  removeFile(file: any) {

    this.ticket.files = this.ticket.files.filter(f => {
      return f.name != file.name;
    })
  }


  updateTicketsStatus(id: number, status: string, ofType: string) {
    this.viewTicketService.getticketByStatus(status, id, ofType).subscribe((data: any) => {
      this.ticket.labels = data.labels
      this.sweetAlertMessages.alertMessage('success', 'Ticket Status Update To ' + status);
    });
  }


  selectTicketsMember(employee: any, isLeader: boolean) {
    if (this.selectedTicketsMembers.get(employee) == undefined) {
      this.selectedTicketsMembers.set(employee, isLeader);
      this.employees = this.employees.filter(e => {
        return e.id != employee.id;
      })
    }
    else {
      this.selectedTicketsMembers.delete(employee);
      this.employees.unshift(employee);
    }

  }

  async addTicketsMember() {
    let pr: TicketsMember[] = [];
    this.selectedTicketsMembers.forEach((key: boolean, value: any) => {
      this.member = new TicketsMember();
      this.member.followers = value;
      this.member.isLeader = key;
      this.member.tickets = this.ticket;
      pr.push(this.member);
    })

    this.ticketsMemberService.addTicketMember(pr).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success', 'Ticket Member added SuccesFully');
    });

    this.getTicketsMemberByTicketId();
  }

  deleteTicketsMember(id: any, name: string) {

    Swal.fire({
      title: ` Remove  ${name} ?`,
      text: "Do you want to Delete the task?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ticketsMemberService.deleteTicketsMember(id).subscribe((data: any) => {
          // this.router.navigate([this.baseRoute+'/tickets/tickets']);
          this.sweetAlertMessages.alertMessage('question', 'Ticket Member Removed With Name ' + name);
        }, err => {
          this.sweetAlertMessages.alertMessage('error', "Error Occured In Delete" + err.error.status);

        });

      }
    });
  }

  searching() {
    if (this.label == '')
      this.getAllEmployees();
    else {
      this.employees = this.employees.filter(e => {
        return e.firstName.toLowerCase().includes(this.label.toLowerCase()) || e.lastName.toLowerCase().includes(this.label.toLowerCase());
      });
    }
  }
  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();


  addTicketFiles() {

    if (this.ticket.files.length > 0)
      this.fileService.addProjectFile(this.ticket.files, this.ticket.id, 'tickets').subscribe((data: any) => {
      })
    this.sweetAlertMessages.alertMessage('success', "Files Added To Ticket")
    this.getTicketById();

  }


  deleteTicketFile(id: any) {
    Swal.fire({
      title: "Do you want to delete the ticket?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then((result: { isConfirmed: any; isDenied: any; }) => {
      / Read more about isConfirmed, isDenied below /
      if (result.isConfirmed) {
        this.fileService.deleteProjectFileById(id, 'tickets').subscribe((data: any) => {
          this.sweetAlertMessages.alertMessage('success', 'TicketFile Deleted successfully.')

        })
        this.getTicketById();

      } else if (result.isDenied) {
        this.sweetAlertMessages.alertMessage("info", "Changes are not saved")

      }
    });
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
        this.viewTicketService.deleteTickets(id).subscribe((data: any) => {
          this.router.navigate([this.baseRoute + '/tickets/tickets'])
          this.sweetAlertMessages.alertMessage('success', 'Ticket Deleted successfully.')
        })
      } else if (result.isDenied) {
        this.sweetAlertMessages.alertMessage("info", "Changes are not saved")

      }
    });
  }


}

