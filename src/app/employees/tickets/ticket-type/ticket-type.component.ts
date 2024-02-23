import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Permissions } from 'src/app/entites/permissions';
import { TicketType } from 'src/app/entites/ticket-type';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { AuthService } from 'src/app/services/auth.service';
import { TicketTypeService } from 'src/app/services/ticket-type.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.scss']
})
export class TicketTypeComponent implements OnInit {
  myForm: FormGroup;
  E: FormGroup;
 
  constructor(private builder: FormBuilder,private ticketTypeService: TicketTypeService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService,
    private location: Location) {this.myForm = this.builder.group({
      title: ['', [Validators.required ,Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
       })
     this.E= this.builder.group({
      title: ['', [Validators.required,Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
      
    })  }

  ticketTypes: TicketType[] = [];
  ticketType: TicketType = new TicketType();


  searching: TicketType = new TicketType();
  ngOnInit(): void {
    this.getAllTicketTypes()
    this.setPermissions();
    this.setBaseUrl();
  }

  addForm(){
    this.myForm.reset();
    this.ticketType = new TicketType();
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

  addTicketType() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }

    this.ticketTypeService.addTicketType(this.ticketType).subscribe((data: any) => {
      this.getAllTicketTypes();
      this.ticketType = new TicketType();
      this.sweetAlertMessages.alertMessage('success', "New Ticket-Type Added Succesfully");
      AppUtils.modelDismiss('add');
    },(err: any) => {
      if(err.error.status>0)
      this.sweetAlertMessages.alertMessage('error',err.error.message); 
      
      else 
           this.sweetAlertMessages.alertMessage('error',err.error.status); 
      
          });
      
  
  }

  setEditData(id: number) {
    this.ticketTypeService.getTicketTypeById(id).subscribe((data: any) => {
      this.ticketType = data;

    })
  }

  updateTicketType() {
    AppUtils.formSubmittion(this.E);
    if (!this.E.valid) {
      //console.log("invalid");
      return;
    }
    this.ticketTypeService.updateTicketType(this.ticketType).subscribe((data: any) => {
      this.ticketType = new TicketType();
      this.getAllTicketTypes();
      this.sweetAlertMessages.alertMessage('success', " Ticket-Type  Updated Succesfully");
      AppUtils.modelDismiss('Eadit');
    },(err: any) => {
      if(err.error.status>0)
      this.sweetAlertMessages.alertMessage('error',err.error.message); 
      
      else 
           this.sweetAlertMessages.alertMessage('error',err.error.status); 
      
          });
      
  }

  

  deleteTicketType(id:number) {
    Swal.fire({
      title: " Delete  Ticke-Type?",
      text: "Do you want to Delete the Ticket-Type?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.ticketTypeService.deleteTicketType(id).subscribe((data: any) => {
          this.getAllTicketTypes();
          this.sweetAlertMessages.alertMessage('success', "Ticket-Type Deleted Succesfully");
    
        }, (err) => {
          this.sweetAlertMessages.alertMessage('error',  err.error.message);
    
        })

      }
    });
  }


  sequence:any=0;
  getAllTicketTypes() {
    this.ticketTypeService.getAllTicketType(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.ticketTypes = data.content;
      this.length = data.totalElements;
      this.sequence = data.pageable.pageNumber * data.pageable.pageSize;
 
    })
  }

  filter() {
    if(this.searching.title==''||this.searching.title==null){
    return ;
    }
    this.ticketTypeService.searchTicketType(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.ticketTypes = data.content;
    })
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
    this.getAllTicketTypes();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }


descriptionMap:Map<String,Boolean> = new Map();

showDesc(value:any){
   let show =this.descriptionMap.get(value) || false;
   return show;
}

changeShow(value:any){
    let show=this.descriptionMap.get(value) || false;
    this.descriptionMap.set(value,!show);
    return !show;
}

getDescription(value:string){
  let show=this.descriptionMap.get(value) || false;
  if(show){
    return value;
  }
  let index= value.split(" ");
  
    return index[0]
}

}
