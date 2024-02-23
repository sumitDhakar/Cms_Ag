import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { AppliedCandidate } from 'src/app/entites/applied-candidate';
import { ManageJobs } from 'src/app/entites/manage-jobs';
import { AppliedCandidateService } from 'src/app/services/applied-candidate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { Permissions } from 'src/app/entites/permissions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-applicants',
  templateUrl: './job-applicants.component.html',
  styleUrls: ['./job-applicants.component.scss']
})
export class JobApplicantsComponent implements OnInit {

  aC: AppliedCandidate = new AppliedCandidate();
  appliedCandidates: AppliedCandidate[] = [];
  myForm: FormGroup;

  constructor(private appliedCandidateService: AppliedCandidateService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder) {


    this.myForm = this.fb.group({

      overTimeDate: ["", [Validators.required]],
      overTimeHours: ["", [Validators.required]],

    });


    this.aC.manageJobs = new ManageJobs();
  }
  overTimeDate = ''
  overTimeHours = ''
  itemId = 0;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['mid']; // Extract the 'id' parameter from the URL
    });
    this.getAllJobApplicants();
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

 addForm(){
    this.myForm.reset();
  }


  getAllJobApplicants() {
    this.appliedCandidateService.getAllAppliedCandidate(this.pageIndex, this.pageSize, this.itemId).subscribe((data: any) => {
      this.appliedCandidates= data.content;

    })
  }

  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };


  download(id: number, fileName: string) {
    this.appliedCandidateService.downloadFile(id).subscribe(
      event => {
        this.reportProgress(event, fileName);

      }
    )
  }

  reportProgress(event: HttpEvent<string[] | Blob>, fileName: string) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.updateFileStatus(event.loaded, event.total!, 'uploading....')
        break;
      case HttpEventType.DownloadProgress:
        this.updateFileStatus(event.loaded, event.total!, 'Downloading...')
        break;
      case HttpEventType.ResponseHeader:
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
        //  saveAs(new Blob([event.body!],
        //   {type:`${event.headers.get('Content-Type')};charset=utf-8`}),
        //   event.headers.get('File-Name'));
        break;
      default:


    }
  }
  updateFileStatus(loaded: number, total: number | undefined, requestType: string) {
    this.fileStatus.status = 'Progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total!);

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
  }




  isListView = false;

  changeView(value: boolean) {
    this.isListView = value;
  }


  
}
