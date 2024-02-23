import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { ManageJobs } from 'src/app/entites/manage-jobs';
import { AdminProjectService } from 'src/app/services/admin/admin-project.service';

import { ManageJobsService } from 'src/app/services/admin/manage-jobs.service';
import { AppliedCandidateService } from 'src/app/services/applied-candidate.service';
import { DepartmentService } from 'src/app/services/admin/department.service';
import { DesignationService } from 'src/app/services/admin/designation.service';
import { EmployeeDesignationService } from 'src/app/services/employee/employee-designation.service';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {


  manageJob: ManageJobs = new ManageJobs();
  manageJobs: ManageJobs[] = [];
  searching: ManageJobs = new ManageJobs();
  itemId: any=0; // To store the extracted ID

  constructor(private route: ActivatedRoute,
    private departmentService: DepartmentService, private designationService: DesignationService,
    private manageJobService: ManageJobsService
,private employeeDesignation:EmployeeDesignationService
    , private projectService: AdminProjectService, private appliedCandidateService: AppliedCandidateService) {

    this.manageJob.department = new Department();
    this.manageJob.jobTitle = new Designation();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id']; // Extract the 'id' parameter from the URL
    });


    this.setEditData();
  }
  departments: Department[] = [];
  designations: Designation[] = [];



  getAllDepartments() {

    this.departmentService.getAllDepartment().subscribe((data: any) => {
      this.departments = data;
    })
  }

  getAllDesignations() {
    this.employeeDesignation.getAllDesignation(0, 1000).subscribe((data: any) => {
      this.designations = data;
    })
  }

  getAllDesignationsByDepartment(id: number) {
    this.designationService.getAllDesignationByDepartmentId(id).subscribe((data: any) => {
      this.designations = data;

    })
  }

  optionSelected(tag: any) {
    this.getAllDesignationsByDepartment(tag.value);
  }


  // adding employee
  addManageJobs() {
    console.log(this.manageJob)
    this.manageJobService.addManageJobs(this.manageJob).subscribe((data: any) => {

    }, (err: any) => {
      console.log(err)
    });

    this.manageJob.department = new Department();
    this.manageJob.jobTitle = new Designation();
  }



  // setting data in edit form
  setEditData() {
    this.manageJobService.getManageJobById(this.itemId).subscribe((data: any) => {
      this.manageJob = data;
    });
  }

  // updating data
  updateManageJobs() {
    this.manageJobService.updateManageJob(this.manageJob).subscribe((data: any) => {
      // this.getAllManageJobs();
    })
  }

  editData() {
    this.getAllDepartments();
    this.getAllDesignations();
  }

  //testing part for apply for jobs 



  jobList: ManageJobs[] = [];







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

  imageData = new Map<string, any>();
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };




  createImageFromBlob(fileName: string, image: Blob) {

    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageData.set(fileName, reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }







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
}



