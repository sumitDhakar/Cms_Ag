import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Clients } from 'src/app/entites/clients';
import { Permissions } from 'src/app/entites/permissions';
import { Projects } from 'src/app/entites/projects';
import { FileSizePipe } from 'src/app/materials/utils/FileSizePipe';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { ImageUtil } from 'src/app/payload/image-util';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppUtils } from 'src/app/materials/utils/app-utils';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [FileSizePipe ,DatePipe],


})
export class ProjectsComponent implements OnInit {
myForm: FormGroup;

E: FormGroup;
date = new Date
todayDate = this.date.toISOString().slice(0,10)//this.datePipe.transform(new Date(),"yyyy-MM-dd")
  
  project: Projects = new Projects();
  searching: Projects = new Projects();
  projects: Projects[] = [];
  clients: Clients[] = [];
  label: string = '';
  labels: string[] = ["HighPriority", "Urgent", "Perfect", "OnTrack", "Upcoming"]
  public Editor = ClassicEditor;


  
  constructor(private clientService: ClientsService,private builder: FormBuilder,private datePipe: DatePipe, 
    private projectService: AdminProjectService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService, private location: Location) {
      
      this.myForm = this.builder.group({
        files: ['', [Validators.required]],
        deadline: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3), Validators.maxLength(5)]],
        clientId: ['', [Validators.required]],
        projectType: ['', [Validators.required]],
        labels: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
        title: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      }),

  
      this.E = this.builder.group({
        // files: ['', [Validators.required]],
        deadline: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/), Validators.minLength(3), Validators.maxLength(5)]],
        clientId: ['', [Validators.required]],
        projectType: ['', [Validators.required]],
        labels: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(215)]],
        title: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]],
      }),
    this.project.clientId = new Clients();
  }

 


   

	projectComments:Comment[]=[];

	deleted = false;
    projectId: any;



addForm(){
  this.myForm.reset();
}

  ngOnInit(): void {
    this.getAllClients();
    this.getAllProject();
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




  getAllClients() {
    this.clientService.getAllClients(0, 1000).subscribe((data: any) => {
      this.clients = data.content;
    })
  }



  selectedFile(event: any) {

    if (this.project.projectFiles.filter(f => {
      return f.name == event.target.files[0].name;
    }).length == 0) {

      this.project.projectFiles.push(event.target.files[0]);
    }

  }

  removeFile(file: any) {

    this.project.projectFiles = this.project.projectFiles.filter(f => {
      return f.name != file.name;
    })
  }

  addProject() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      return;
    }

    this.projectService.addProject(this.project).subscribe((data: any) => {
      this.getAllProject();
      this.project = new Projects();
      this.project.clientId = new Clients();
      this.sweetAlertMessages.alertMessage('success', 'Project Created  successfully.')
      AppUtils.modelDismiss('add');
    }, (err: any) => {
      this.sweetAlertMessages.alertMessage('question', err.error?.status);
    });

    
  }

  setEditData(id: number) {
    this.projectService.getProjectById(id).subscribe((data: any) => {
      this.project = data;
      this.label= this.project.labels[0];
      this.project.projectFiles=[];
    })
  }

  updateProject() {
    this.addLabels(this.label);
    AppUtils.formSubmittion(this.E);
    if (!this.E.valid) {
      console.log(this.E);
      
      return;
    }

    this.projectService.updateProject(this.project).subscribe((data: any) => {
      this.getAllProject();
      this.project = new Projects();
      this.project.clientId = new Clients();
      AppUtils.modelDismiss('Eadit');
    }, (err: any) => {
      console.log(err);
      this.sweetAlertMessages.alertMessage('question', err.error.status);
    });

  }


  updateStatus(id: number, data: string, type: string) {
    if (type == 'priority') {
      this.projectService.updateProjectStatus(id, '', data).subscribe((data: any) => {
        this.sweetAlertMessages.alertMessage('success', "Project Priority Updated Succesfully");

        this.getAllProject();
      });
    } else if (type == 'status') {
      this.projectService.updateProjectStatus(id, data, '').subscribe((data: any) => {
        this.sweetAlertMessages.alertMessage('success', "Project Status Updated Succesfully");
        this.getAllProject();
      });
    }

  }


  confirm(id: number) {
    this.project.id = id;
  }

  deleteProject() {
    this.projectService.deleteProjectById(this.project.id).subscribe((data: any) => {
      this.sweetAlertMessages.alertMessage('success', "Project deleted Succesfully");
      this.getAllProject();

    })
  }

  getAllProject() {
    this.projectService.getAllProject(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.projects = data.content;
      this.length = data.totalElements;
    })
  }



  filter() {
    if ((!this.searching || !this.searching.title || this.searching.title.trim() === '') &&
    (!this.searching|| !this.searching.priority || this.searching.priority === 0)&&
    (!this.searching|| !this.searching.deadline|| this.searching.deadline === 0)
    )
     {
  return;
    }
    this.projectService.searchProjects(this.searching).subscribe((data: any) => {
      this.projects = data;
     
      

    })
  }




  addLabels(tag: any) {
    this.label = tag.value;
    let a;

    a = this.project.labels.indexOf(this.label);
    if (a == -1) {
      if (this.labels.indexOf(this.label) != -1)
        this.project.labels.push(this.label);

      this.labels = this.labels.filter(l => {
        return l != this.label;
      })
    }
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
    this.getAllProject();
  }




  isListView = false;

  changeView(value: boolean) {
    this.isListView = value;
  }

}
