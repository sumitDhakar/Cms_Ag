import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/entites/clients';
import { Currency } from 'src/app/entites/currency';
import { Users } from 'src/app/entites/users';
import { ClientsService } from 'src/app/services/clients.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

import { ImageUtil } from 'src/app/payload/image-util';
import { AuthService } from 'src/app/services/auth.service';
import { Permissions } from 'src/app/entites/permissions';
import { DatePipe, Location } from '@angular/common';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { UserListResponse } from 'src/app/payload/user-list-response';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers:[DatePipe]
})
export class ClientsComponent implements OnInit{
  
  todayDate= this.datePipe.transform(new Date(),"yyyy-MM-dd")

  myForm: FormGroup;
  E: FormGroup;
 
  users:UserListResponse[]=[];
  confirmPassword=''
  
client:Clients = new Clients();
clients:Clients[]=[];
search:Clients = new Clients();

isListView=false;
currencies:Currency[]=[];

        
constructor(private builder: FormBuilder,private userService:AdminUsersService,private datePipe:DatePipe,
  private location :Location,    private sweetAlertMessages: SweetAlertMessagesProvidersService,

   private clientService:ClientsService,private currencyService:CurrencyService,
  private authService:AuthService){
    this.myForm = this.builder.group({
    //  owner: ['', [Validators.required]],
      labels: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      clientGroups: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern("^[0-9]{6}$"), Validators.minLength(6), Validators.maxLength(6)]],
      website: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      gstNumber: ['', [Validators.required, Validators.pattern(/^[0-30]*$/), Validators.min(1), Validators.max(30)]],
      vatNumber: ['', [Validators.required,  Validators.pattern(/^[0-20]*$/),Validators.min(1), Validators.max(20)]],
      disableOnlinePayment: ['', [Validators.required]],
      currencySymbol: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      country: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      companyName: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(2), Validators.maxLength(25)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/), Validators.minLength(10), Validators.maxLength(10)]],
      firstName:['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      lastName:['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],
      state:['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) , Validators.minLength(3), Validators.maxLength(25)]],

      gender: new FormControl( '', [Validators.required]),
      dob: new FormControl('', [Validators.required,this.validateDate ]),
      joining: new FormControl('', [Validators.required]),
     
    }),
         this.E = this.builder.group({ 
      //confirmPassword: ['', [Validators.required]],
      //password: ['', [Validators.required]],
    //  gender: new FormControl( '', [Validators.required]),
      // dob: new FormControl('', [Validators.required,this.validateDate ]),
      //joining: new FormControl('', [Validators.required]),
      companyName: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', [Validators.required ,Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/) ,Validators.minLength(3), Validators.maxLength(25)]],
      firstName: ['', [Validators.required,Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/),Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      city: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern("^[0-9]{6}$"), Validators.minLength(6), Validators.maxLength(6)]],
      country: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/), Validators.minLength(10), Validators.maxLength(10)]],
      website: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      gstNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(3)]],
      vatNumber: ['', [Validators.required,  Validators.pattern("^[0-9]*$"),, Validators.min(1), Validators.max(20)]],
      clientGroups: ['', [Validators.required]],
      currencySymbol: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      labels: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      disableOnlinePayment: ['', [Validators.required]],
   
      
      
   
    
    })
}
  ngOnInit(): void {
  //  this.getAllEmployees();
    this.getAllCurrencies();
    this.getAllClients();
    this.setPermissions();
    this.setBaseUrl();
    }
    validateDate(control: any): { [key: string]: boolean } | null {

      if (control.value) {
          let present = new Date();
          let dob = new Date(control.value);
  
  
        if (present.getFullYear() - dob.getFullYear() <18) {
          return { 'invalidDate': true };
        }
      }
      return null;
    }
  
    
  
    baseRoute='employee-dash'
    imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/';

    
    setBaseUrl(){
      this.baseRoute = this.authService.getUrl();
    }
    
      permissions:Permissions=new Permissions();
      setPermissions(){
        this.authService.isUserPermitted(this.location.path(),false).then(data=>{
          if(data==null)
          this.authService.navigate(this.baseRoute);
             this.permissions =  data;
        }) 
      }
   
  // imageUtils:ImageUtil=new ImageUtil();
  // imageUrl  =this.imageUtils.getImageUrl();         

  selectFile(event:any){
    this.client.userImage= event.target.files[0];
  }
  

  getAllEmployees() {
    this.userService.getAllEmployees(0, 10000,2).subscribe((data: any) => {
      this.users = data.content;
     
    })
  }


  
  addForm(){this.myForm.reset();
    this.client = new Clients();

  }
 

getAllCurrencies(){
  this.currencyService.getAllCurrency().subscribe((data:any)=>{
     this.currencies = data.currencies;
 
  })
}

addClient(){
  AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }
   this.clientService.addClient(this.client).subscribe((data:any)=>{
    this.getAllClients();
    this.sweetAlertMessages.alertMessage('success', 'Assets Created For Employee successfully.')
    AppUtils.modelDismiss('add');
  }, (err: any) => {
    console.log(err);
    this.sweetAlertMessages.alertMessage('question', err.error.status);
  });

}

setEditData(id:number){
  this.clientService.getClientById(id).subscribe((data:any)=>{
      this.client = data;
  })
}

updateClient(){
   alert("mkmvkko")
  AppUtils.formSubmittion(this.E);
  if (!this.E.valid) {
    //console.log("invalid");
    return;
  }
  
  this.clientService.updateClient(this.client).subscribe((data:any)=>{
    this.sweetAlertMessages.alertMessage('success',"Client Updated Succesfully"); 
    AppUtils.modelDismiss('Edit');
  
    this.getAllClients();
  })
}

confirm(id:number){
  this.client.id=id;
}

deleteClient(){
  this.clientService.deleteClient(this.client.id).subscribe((data:any)=>{
    this.sweetAlertMessages.alertMessage('success',"Client Deleted Succesfully"); 
     this.getAllClients()
  })
}

getAllClients(){
  this.clientService.getAllClients(this.pageIndex,this.pageSize).subscribe((data:any)=>{
     this.clients = data.content;
     this.length = data.totalElements;
  })
}

// update Client Status
updateClientStatus(id:number,status:string){
  this.clientService.updateClientStatus(id,status).subscribe((data:any)=>{
    this.sweetAlertMessages.alertMessage('success',"Client Status Changed to  "+status+" Succesfully"); 
    this.getAllClients();
  });
}

// search client 
searchClient(){
 
  
  if ((!this.search || !this.search.companyName || this.search.companyName.trim() === '') &&
  (!this.search || !this.search.firstName || this.search.firstName.trim() === '')) {
return;
}


 {
  this.clientService.searchClient(this.pageIndex,this.pageSize,this.search).subscribe((data:any)=>{
    this.clients=data.content;
    console.log(data.content);
    
    this.length=data.totalElements;
  })
}
}


 // changing view of employee
 changeView(put:boolean) {
   this.isListView=put;
}

// pagination

length = 50;
pageSize = 12;
pageIndex = 0;
pageSizeOptions = [4,8,12];

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
  this.getAllClients();
}

setPageSizeOptions(setPageSizeOptionsInput: string) {
  if (setPageSizeOptionsInput) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}



}
