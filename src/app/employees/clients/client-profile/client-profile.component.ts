import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clients } from 'src/app/entites/clients';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { Tasks } from 'src/app/entites/tasks';
import { Users } from 'src/app/entites/users';
import Swal from 'sweetalert2';
import { ImageUtil } from 'src/app/payload/image-util';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AdminTasksService } from 'src/app/services/admin/admin-tasks.service';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import { EmployeeProjectCommentsService } from 'src/app/services/employee/employee-project-comments.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit{
  myForm: FormGroup;
  client:Clients = new Clients();
constructor(private activateRoute:ActivatedRoute,private builder: FormBuilder ,
  private clientService:ClientsService,
  private location:Location,
  private usersService: AdminUsersService,
       private authService:AuthService,
       private projectCommentService: EmployeeProjectCommentsService,
       private taskService: AdminTasksService,


  private adminProjectService:AdminProjectService){
    this.myForm = this.builder.group({
      address: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(2), Validators.maxLength(25)]],
      phone: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$"),, Validators.minLength(10), Validators.maxLength(10)]],
      firstName:['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      lastName:['', [Validators.required, Validators.pattern(/^([A-Z][a-z]*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      dob:['', [Validators.required,this.validateDate]],
      gender:['', [Validators.required]]
 
      

    })
    
  }

  projects:Projects[]=[];
  ngOnInit(): void {
     this.activateRoute.params.subscribe((param:any)=>{
      this.client.id = param['cid'];
      this.getClient();
      this.getAllProjectOfClient();
     })
     this.setPermissions();
     this.setBaseUrl();
     }
   
     baseRoute='employee-dash'
     
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
   //  imageUtils:ImageUtil=new ImageUtil();
  //imageUrl  =this.imageUtils.getImageUrl();     

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
  
    
  getClient(){
    this.clientService.getClientById(this.client.id).subscribe((data:any)=>{
      this.client = data;
    })
  }

getAllProjectOfClient(){
  this.adminProjectService.getProjectByClientId(0,1000,this.client.id).subscribe((data:any)=>{
      this.projects = data.content;
  })
}

project: Projects = new Projects();
getAllTaskByProjectIdAndStatus(status: string) {
  this.taskService.getAllTaskByProjestIdAndStatus(0, 10000, this.project.id, status).subscribe((data: any) => {
    this.tasks = data.content;
    console.log(data.content);
    this.getProjectCommentsByProjectId(this.project.id);
  })
}

tasks: Tasks[] = [];
projectComments: Comment[] = [];
getProjectCommentsByProjectId(id: number) {
  if (id == 0)
    id = this.projects[0].id;
  this.projectCommentService.getProjectCommentsByProjectId(0, 10000, id).subscribe((data: any) => {
    this.projectComments = data.content;
  })
}

getAllTaskByProjectId() {
  if (this.project.id <= 0)
    this.project.id = this.projects[0].id;
  this.taskService.getAllTasksByProjectId(0, 10000, this.project.id).subscribe((data: any) => {
    this.tasks = data.content;
    // this.getProjectCommentsByProjectId(this.project.id);
      this.viewTaskDetailsAndComments(this.tasks[0].id);
  })
}
taskDetails:Tasks=new Tasks();
viewTaskDetailsAndComments(id:number){
  if(id==this.taskDetails.id){
    return ;
  }
this.taskService.getTaskById(id).subscribe((data: any) => {
  this.taskDetails = data;
  
}) 
}
check=false;
changeView(viewType:any){
  if('projects'==viewType)
    this.check=false;
    else
    this.check=true;

    
  }

  imageUrl = environment.hostUrl + '/auth/file/getImageApi/UserProfile/';
  user: Users = new Users();

  selectFile(event: any) {
    this.client.userImage = event.target.files[0];

    var reader = new FileReader();
    console.log(event);

    reader.onload = function (e) {
      let button = document.getElementById("file");
      button?.setAttribute("src", e!.target!.result + "");
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  openFile(target: any) {
    target.click();
  }
  // updating data
  updateClient() {

    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      //console.log("invalid");
      return;
    }
  
    this.clientService.updateClient(this.client).subscribe((data: any) => {
      this.getClient();
      AppUtils.modelDismiss('Edit');
    
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      Toast.fire({
        icon: 'success',
        title: 'Client Details Update SuccessFully !!'
        
      }).then(e => {

      })


    })

  }


}
