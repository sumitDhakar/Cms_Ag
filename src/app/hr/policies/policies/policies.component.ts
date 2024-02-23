import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/entites/department';
import { Policy } from 'src/app/entites/policy';
import { AdminPolicyService } from 'src/app/services/admin/admin-policy.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { EmployeePolicyFileService } from 'src/app/services/employee/employee-policy-file.service';
import { saveAs } from 'file-saver'; // Import the file-saver library
import { PolicyFile } from 'src/app/entites/policy-file';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Permissions } from 'src/app/entites/permissions';
import { PageEvent } from '@angular/material/paginator';
import { SweetAlertMessagesProvidersService } from 'src/app/materials/utils/sweet-alert-messages-providers.service';
@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  myForm: FormGroup;

  constructor(private adminPolicyService: AdminPolicyService,
    private fb: FormBuilder,
    private location: Location,
    private sweetAlertMessages: SweetAlertMessagesProvidersService,
    private authService: AuthService,
    private departmentService: DepartmentService,
    private employeePolicyFileService: EmployeePolicyFileService) {
    this.policy.department = new Department();

    this.myForm = this.fb.group({

      name: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}([a-z]*\s*)+$/), Validators.minLength(2), Validators.maxLength(25)]),
      file: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]),
    });



  }
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };

  ngOnInit(): void {
    this.getAllPolicies();
    this.getAllDepartments();
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

  policies: Policy[] = [];
  departments: Department[] = [];
  policy: Policy = new Policy();

  getAllDepartments() {
    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departments = data;
    })
  }
  addForm() {
    this.policy = new Policy();
    this.policy.department = new Department();
  }

  public firstTaskFormControl() {
    Object.keys(this.myForm.controls).forEach(key => {
      const control = this.myForm.get(key)
        ;
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }



  addPolicy() {
    this.firstTaskFormControl();
    if (this.myForm.valid)
      this.adminPolicyService.addPolicy(this.policy).subscribe((data: any) => {
        this.myForm.reset();
        this.policy = new Policy();
        this.policy.department = new Department();
        this.getAllPolicies();

        this.sweetAlertMessages.alertMessage('success', 'Policy Created successfully.')
      },
        (err) => {

          if (err.status == 302)
            this.sweetAlertMessages.alertMessage('error', "Policy Creation" + err.error.status);


          if (err.error.status == 409)
            this.sweetAlertMessages.alertMessage('error', err.error.message);

          if (err.error.status == 409)
            this.sweetAlertMessages.alertMessage('error', err.error.message);

        }
      )

  }
  deleteId = 0;

  setEditData(id: number) {
    this.adminPolicyService.getPolicyById(id).subscribe((data: any) => {
      this.policy = data;
      this.policy.fileData = [];
      if (this.policy.department == null)
        this.policy.department = new Department();
    })
  }

  updatePolicy() {
    this.adminPolicyService.updatePolicy(this.policy).subscribe((data: any) => {
      console.log(data);
      this.policy = new Policy();
      this.policy.department = new Department();
      this.getAllPolicies();
      this.sweetAlertMessages.alertMessage('success', 'Policy  updated successfully.')
    })
  }


  deletePolicy(id: number) {
    Swal.fire({
      title: " Remove  Member?",
      text: "Do you want to remove this policy?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: '#ff9b44',
      // denyButtonColor:'',/
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.adminPolicyService.deletePolicyById(id).subscribe((data: any) => {
          this.getAllPolicies();
          this.sweetAlertMessages.alertMessage('success', "Removed Policy SuccesFully");
        }, err => {
          this.sweetAlertMessages.alertMessage('error', "Changes Not Saved" + err.error.status);
        });

      }
    });

  }


  downloadFile(files: PolicyFile[]) {
    files.forEach(f => {

      this.employeePolicyFileService.downloadFile(f.id).subscribe(
        event => {
          console.log(event);
          this.reportProgress(event, f.originalFileName);

        }
      )
    })
  }

  reportProgress(event: HttpEvent<string[] | Blob>, fileName: string) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        // this.updateStatus(event.loaded, event.total!, 'uploading....')
        break;
      case HttpEventType.DownloadProgress:
        // this.updateStatus(event.loaded, event.total!, 'Downloading...')
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
        // console.log(event.headers.get('File-Name'));
        //  saveAs(new Blob([event.body!],
        //   {type:`${event.headers.get('Content-Type')};charset=utf-8`}),
        //   event.headers.get('File-Name'));
        break;
      default:
        console.log(event);


    }
  }


  selectedFile(event: any) {

    if (this.policy.fileData.filter(f => {
      return f.name == event.target.files[0].name;
    }).length == 0) {

      this.policy.fileData.push(event.target.files[0]);
    }

  }

  removeFile(file: any, isPolicyFlie: boolean) {
    if (!isPolicyFlie) {
      this.policy.fileData = this.policy.fileData.filter(f => {
        return f.name != file.name;
      })
    }
    else {
      this.policy.files = this.policy.files.filter(f => {
        return f.originalFileName != file.originalFileName;
      })
    }
  }

  sequence = 0;
  getAllPolicies() {
    this.adminPolicyService.getAllPolicies(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.policies = data.content;
      this.length = data.totalElements;
      this.sequence = this.pageIndex * this.pageSize;
    })
  }

  selectedDepartment(inp: any) {
    this.policy.department.id = inp.value;
  }

  // pagination

  length = 50;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions = [1, 2, 5, 10];

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
    this.getAllPolicies();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }

}
