import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { ManageJobs } from 'src/app/entites/manage-jobs';
import { Router } from '@angular/router';
import { ManageJobsService } from 'src/app/manage-jobs.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
increateViewAndShow(id: number) {



  this.manageJobService.updateManageJobView(id).subscribe((data: any) => {
        this.router.navigate(['/apply/job/',id])
        
  });
}

  jobList:ManageJobs[]=[];
  
  constructor(  private manageJobService: ManageJobsService,
    private router :Router){
      this.manageJob.department = new Department();
      this.manageJob.jobTitle = new Designation();
    }
    manageJob: ManageJobs = new ManageJobs();
    manageJobs: ManageJobs[] = [];
    searching: ManageJobs = new ManageJobs();


  ngOnInit(): void {
    this.getAllManageJobs();
  }




  getAllManageJobs() {
    this.manageJobService.getAllManageJobs(this.pageIndex, 1000).subscribe((data: any) => {
      this.jobList = data.content;
    })
  }

  // setting data in edit form
  setEditData(id: number) {
    this.manageJobService.getManageJobById(id).subscribe((data: any) => {
      this.manageJob = data;
    });
  }

  // updating data
  updateManageJobs() {
    this.manageJobService.updateManageJob(this.manageJob).subscribe((data: any) => {
      this.getAllManageJobs();
    })
  }



  // searching the user
  filter() {
    //this.searching.designation.setDepartment(null);
    this.manageJobService.searchManageJob(this.pageIndex, this.pageSize, this.searching).subscribe((data: any) => {
      this.manageJobs = data.content;
      this.length = data.totalElements
    })
  }

  // setting id for delete
  confirm(id: number) {
    this.manageJob.id = id;
  }

  //  deleteManageJob
  deleteManageJob() {
    this.manageJobService.deleteManageJob(this.manageJob.id).subscribe((data: any) => {
      this.manageJobs = this.manageJobs.filter(a => {
        return a.id != this.manageJob.id;
      })
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
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

  }



}


