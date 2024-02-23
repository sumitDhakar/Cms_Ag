import { Projects } from 'src/app/entites/projects';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';
import { EmployeeProjectCommentsService } from 'src/app/services/employee/employee-project-comments.service';
import { saveAs } from 'file-saver'; // Import the file-saver library
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AdminProjectFileService } from 'src/app/services/admin/admin-project-file.service';
import { Tasks } from 'src/app/entites/tasks';
import { Users } from 'src/app/entites/users';
import { AdminUsersService } from 'src/app/services/admin/adminUsers.service';
import { AdminTasksService } from 'src/app/services/admin/admin-tasks.service';
import Swal from 'sweetalert2';
import { Designation } from 'src/app/entites/designation';
import { commentsRequestTs } from 'src/app/entites/comments-request';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/entites/comment';
import { CommentSocketResponse } from 'src/app/payload/comment-socket-response';
import { Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
import { UserListResponse } from 'src/app/payload/user-list-response';
import { TaskMembers } from 'src/app/entites/task-members';
import { ImageUtil } from 'src/app/payload/image-util';
import { WebsocketService } from 'src/app/services/websocket-service.service';
import { WebSocketService } from 'src/app/services/WebSocket/web-socket.service';
import { MessageMapping } from 'src/app/materials/custome-routing/message-mapping';
import { ChatMessagesManager } from 'src/app/entites/chat/chat-messages-manager';
import { TaskMessageRequest } from 'src/app/payload/task-message-request';
import { TaskMemberService } from 'src/app/services/admin/task-member.service';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeTaskAssignedPayload } from 'src/app/payload/change-task-assigned-payload';
import { AppUtils } from 'src/app/materials/utils/app-utils';
import { ProjectMemberListForTask } from 'src/app/payload/project-member-list-for-task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [DatePipe],
})

export class TasksComponent implements OnInit {
  socketObservables: ChatMessagesManager = new ChatMessagesManager();
  myForm: FormGroup;
  E: FormGroup;
  date = new Date
  
  todayDate = this.date.toISOString().slice(0, 10)//this.datePipe.transform(new Date(),"yyyy-MM-dd")

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param: any) => {

      this.project.id = param['id'];

      this.getAllProjects();
    })
    this.getUser();
    this.setPermissions();
    this.setBaseUrl();
    this.removeSidebarClass();
    this.getAllEmployees();
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


  getUser() {
    this.user = this.authService.getUser()
  }
  public Editor = ClassicEditor;

  constructor(private projectService: AdminProjectService, private builder: FormBuilder, private datePipe: DatePipe,
    private adminUserService: AdminUsersService, private router: Router,
    private taskMembersService: TaskMemberService,
    private taskService: AdminTasksService,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private projectCommentService: EmployeeProjectCommentsService, private activateRoute: ActivatedRoute,
    private fileService: AdminProjectFileService,
    private location: Location,
    private authService: AuthService,
    private socketService: WebSocketService,

  ) {
    this.myForm = this.builder.group({
      title: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(3), Validators.maxLength(25)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
      points: new FormControl('', [Validators.required]),
      relatedTo: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      members: new FormControl('', [Validators.required]),
      // hours: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(1),Validators.maxLength(3)]),
      label: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),

    }),
      this.E = this.builder.group({
        title: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(2), Validators.maxLength(25)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
        points: new FormControl('', [Validators.required]),
        relatedTo: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        deadline: new FormControl('', [Validators.required]),
        members: new FormControl('', [Validators.required]),
        // hours: new FormControl('', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(1),Validators.maxLength(3)]),
        label: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),

      }),

      this.member.members = new Users();
    this.member.members.designation = new Designation();
    this.leader.members = new Users();
    this.leader.members.designation = new Designation();
    this.task.projectId = new Projects();
    this.searchUser.designation = new Designation();
  }
  imageUtils: ImageUtil = new ImageUtil();
  imageUrl = this.imageUtils.getImageUrl();


  project: Projects = new Projects();
  projects: Projects[] = [];
  tasks: Tasks[] = [];
  projectComment: commentsRequestTs = new commentsRequestTs();
  projectComments: Comment[] = [];
  task: Tasks = new Tasks();
  employees: ProjectMemberListForTask[] = [];
  employeeList: ProjectMemberListForTask[] = [];
  collabratorList: TaskMembers[] = [];
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };

  pageIndex = 0;
  pageSize = 1000;

  isListView = false;
  user: Users = new Users();
  getAllEmployees() {
    this.taskService.getAllAssignedEmployeesofProject(this.project.id).subscribe((data: any) => {
      this.employees = data;
      this.employeeList = data;
    })
  }


  createProjectComment() {

    let user = this.authService.getUser()
    this.projectComment.userId = user && user.id
    this.projectComment.projectId = this.project.id;
    this.projectComment.type = 'projectComment'
    let message = new TaskMessageRequest()
    message.groupId = this.taskDetails.id
    message.message = "hello  how are you ..."
    this.messageSend(message)
    // this.projectCommentService.addProjectComments(this.projectComment).subscribe((data: any) => {
    //   this.projectComments.push(data);

    //   let obj = new CommentSocketResponse()

    //   obj.projectId = data.projectId.id
    //   obj.createdAt = (data.createdAt).toString()
    //   obj.file = data.fileId && data.fileId.filter((e: any) => {
    //     return e.fileName != null
    //   }) as string[]
    //   obj.description = data.description
    //   obj.user = data.createdBy
    //   this.projectComment = new commentsRequestTs();
    // })
  }

  public messageSend(msg: any) {
    this.socketService.sendMessage(MessageMapping.SEND_GROUP_MESSAGE, msg);
  }


  selectProject(projectId: number) {
    if (projectId == this.project.id) {
      return;
    }
    this.project.id = projectId;
    this.getAllEmployees();
    this.getAllTaskByProjectId();

  }

  getAllProjects() {
    this.projectService.getAllProject(0, 10000).subscribe((data: any) => {
      this.projects = data.content;
      this.projects.filter(f => {
        if (f.id == this.project.id) {
          this.project = f;
        }

      })
      this.getAllEmployees();
      this.getAllTaskByProjectId();

    })
  }

  id!: number;

  getAllTaskByProjectId() {
    if (this.project.id <= 0)
      this.project.id = this.projects[0].id;
    this.taskService.getAllTasksByProjectId(0, 10000, this.project.id).subscribe((data: any) => {
      this.tasks = data.content;
      if (this.tasks.length > 0)
        this.viewTaskDetailsAndComments(this.tasks[0].id);
    }, (err) => {
      console.log(err.status);
      console.log(err.error.status);

      if (err.error.status == 302)
        this.sweetAlertMessages.alertMessage('error', 'Something Went Wrong ')

      else if (err.error.status == 404) {
        this.sweetAlertMessages.alertMessage('error', "Project Not Found ")
        localStorage.clear();
        this.router.navigate(['login']);
      }
    })
  }

  taskDetails: Tasks = new Tasks();
  viewTaskDetailsAndComments(id: number) {
    if (id == this.taskDetails.id) {
      return;
    }
    this.taskService.getTaskById(id).subscribe((data: any) => {
      this.taskDetails = data;
      this.id = this.taskDetails.id
      this.messageRecieved();
    })
  }

  public messageRecieved() {
    this.socketObservables.recieveMessage = this.socketService.subscribeMessgae(MessageMapping.RECIEVE_MESSAGE + this.taskDetails.id).subscribe({
      next: (data: any) => {
        console.log('recieved messsage' + data);
      }
    })

  }

  getAllTaskByProjectIdAndStatus(status: string) {
    this.taskService.getAllTaskByProjestIdAndStatus(0, 10000, this.project.id, status).subscribe((data: any) => {
      this.tasks = data.content;
      this.getProjectCommentsByProjectId(this.project.id);
    })
  }


  getProjectCommentsByProjectId(id: number) {
    if (id == 0)
      id = this.projects[0].id;
    this.projectCommentService.getProjectCommentsByProjectId(0, 10000, id).subscribe((data: any) => {
      this.projectComments = data.content;
    })
  }



  selectedFile(event: any) {

    for (let file of event.target.files) {
      this.projectComment.files.push(file)
    }


  }


  download(id: number, fileName: string) {

    this.fileService.downloadFile(id).subscribe(
      event => {
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

        break;
      default:


    }
  }

  updateStatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'Progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total!);

  }
  removeSelectedFile(name: string) {
    this.projectComment.files = this.projectComment.files.filter(f => {
      return f.name != name;
    })
  }

  addTask() {
    AppUtils.formSubmittion(this.myForm);
    if (!this.myForm.valid) {
      console.log(this.myForm);

      return;
    }

    this.task.projectId.id = this.project.id;
    this.leader.isLeader = true;
    this.collabratorList.push(this.leader);
    this.task.taskMembers = this.collabratorList;
    this.taskService.addTasks(this.task).subscribe((data: any) => {

      this.task = new Tasks();
      this.task.projectId = new Projects();
      this.task.taskMembers = [];
      this.task.Tasklabels = [];
      this.collabratorList = [];
      console.log('collaboratore', this.collabratorList);

      this.leader = new TaskMembers();
      this.leader.members = new Users();
      this.tasks.push(data);
      this.taskDetails = data;
      this.sweetAlertMessages.alertMessage('success', "Task Added To this Project " + this.project.title);
      AppUtils.modelDismiss('add');
    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Project Not Saved" + err.error.status);

    });
  }

  label = '';
  labels: string[] = ["HighPriority", "Urgent", "Perfect", "OnTrack", "Upcoming"]
  addLabels(tag: any) {
    this.label = tag.value;
    let a;

    a = this.task.Tasklabels.indexOf(this.label);
    if (a == -1) {
      if (this.labels.indexOf(this.label) != -1)
        this.task.Tasklabels.push(this.label);

      this.labels = this.labels.filter(l => {
        return l != this.label;
      })
      console.log(this.task.Tasklabels);
    }
  }

  member: TaskMembers = new TaskMembers();

  pushInList(event: ProjectMemberListForTask, isLeader: boolean) {

    this.member = new TaskMembers();
    this.member.members = new Users();
    this.member.members.id = event.id;
    this.member.members.profileName = event.profileName;
    this.member.members.firstName = event.firstName;
    this.member.members.lastName = event.lastName;

    this.member.members.email = event.email;
    this.member.isLeader = isLeader;
    this.collabratorList.push(this.member);
  }
  leader: TaskMembers = new TaskMembers();


  selectMemberForTask(event: any, isLeader: boolean) {
    let check = false;
    this.collabratorList.find(u => {
      if (u.members.id == event) {
        this.sweetAlertMessages.alertMessage('info', 'Employee Is Already A member Of This Task');
        check = true;
      }
      else if (event == this.leader.members.id) {
        this.sweetAlertMessages.alertMessage('info', 'Employee Is Already A Leader Of This Task');
        check = true;
      }
    })
    if (!check)
      this.employees.filter(e => {
        if (e.id == event) {
          this.pushInList(e, isLeader);
        }
      })
  }


  removeCollaberators(removeUser: any) {

    this.collabratorList = this.collabratorList.filter(u => {
      return u.members.email != removeUser.members.email;
    })
  }

  addForm() {
    this.myForm.reset();
  }

  deleteTask(id: number) {

    Swal.fire({
      title: " Delete  Task?",
      text: "Do you want to Delete the task?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe((data: any) => {
          this.getAllTaskByProjectId();
          this.sweetAlertMessages.alertMessage('success', "Task deleted Succesfully");
        }, err => {
          console.log(err)
          this.sweetAlertMessages.alertMessage('error', "Task Not Saved" + err.error.status);
        });

      }
    });

  }


  updateTaskStatus(task: Tasks) {
    let status: string = '';
    if (task.status == 'Completed') {
      status = 'Todo'
    }
    else {
      status = 'Completed'
    }
    this.taskService.updateTaskStatus(status, task.id).subscribe((data: any) => {
      this.getAllTaskByProjectId();
      this.sweetAlertMessages.alertMessage('success', "Taks Status Changed Succesfully");
    }, err => {
      console.log(err)
    });
  }


  assigneLeader: ChangeTaskAssignedPayload = new ChangeTaskAssignedPayload();

  updateTaskAssignedEmployee(u: any) {

    Swal.fire({
      title: 'Assigne Task?',
      text: 'Assigne Task : ' + this.taskDetails.title + '' + " to Employee :" + u.firstName + '' + u.lastName,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Update',
      denyButtonText: `Cancle`,
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.assigneLeader.taskId = this.taskDetails.id;
        this.assigneLeader.userId = u.id;
        this.taskMembersService.changeTaskMembers(this.assigneLeader).subscribe((data: any) => {
          this.viewTaskDetailsAndComments(this.taskDetails.id)
          this.assigneLeader = new ChangeTaskAssignedPayload();
          this.sweetAlertMessages.alertMessage('question', "Assigned Task To another Employee SuccesFully");
        }, err => {
          this.sweetAlertMessages.alertMessage('error', "Error Occured" + err.error.status);

          if (err.error.status == 404)
            this.sweetAlertMessages.alertMessage('error', "Task Or Project Not Found");

        });
      } else if (result.isDenied) {
        this.sweetAlertMessages.alertMessage('info', "Changes Not Saved");

      }
    })
  }

  // For Serching of user through name 
  searchUser: Users = new Users();
  searchEmployeeToAddCollabrators() {
    this.adminUserService.searchEmployee(0, this.employees.length, this.searchUser).subscribe((data: any) => {
      this.employeeList = data.content;
    })
  }


  async addTaskMembers() {
    this.collabratorList.forEach(e => {
      e.task = new Tasks();
      e.task.id = this.taskDetails.id;
    })
    this.taskMembersService.addTaskMembers(this.collabratorList).subscribe((data: any) => {

      data.forEach((d: any) => {
        this.taskDetails.taskMembers.push(d);

      })
      this.collabratorList = [];
      this.sweetAlertMessages.alertMessage('success', "Task Members Added Succesfully");
    }, err => {
      this.sweetAlertMessages.alertMessage('error', "Error Occured" + err.error.status);

    });
  }


  username: string = '';
  text: string = '';
  connected: boolean = false;


  removeSidebarClass() {
    let element = document.getElementById("sidebar");
    element?.classList.remove("opened");
    console.log(element);

  }


  removeTaskMember(id: number) {

    Swal.fire({
      title: " Remove  Member?",
      text: "Do you want to remove this member?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.taskMembersService.deleteTaskMembers(id).subscribe((data: any) => {
          this.getAllTaskByProjectId();
          this.sweetAlertMessages.alertMessage('success', "Removed Member From Task");
        }, err => {
          console.log(err)
          this.sweetAlertMessages.alertMessage('error', "Changes Not Saved" + err.error.status);
        });

      }
    });

  }

}