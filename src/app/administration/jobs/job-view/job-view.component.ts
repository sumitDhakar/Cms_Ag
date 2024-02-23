import { Component, OnInit } from '@angular/core';
import { ManageJobs } from 'src/app/entites/manage-jobs';
import { ActivatedRoute, Routes } from '@angular/router';
import { AppliedCandidate } from 'src/app/entites/applied-candidate';
import { Department } from 'src/app/entites/department';
import { Designation } from 'src/app/entites/designation';
import { ManageJobsService } from 'src/app/manage-jobs.service';
import { AppliedCandidateService } from 'src/app/services/applied-candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {

  aC: AppliedCandidate = new AppliedCandidate();

  manageJob: ManageJobs = new ManageJobs();
  manageJobs: ManageJobs[] = [];
  searching: ManageJobs = new ManageJobs();
  itemId: any; // To store the extracted ID

  constructor(private route: ActivatedRoute,
    private manageJobService: ManageJobsService
    ,  private appliedCandidateService: AppliedCandidateService) {

    this.manageJob.department = new Department();
    this.manageJob.jobTitle = new Designation();
    this.aC.manageJobs = new ManageJobs();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id']; // Extract the 'id' parameter from the URL
    });


    this.setEditData(0);
  }
  // setting data in edit form
  setEditData(id: number) {
    this.manageJobService.getManageJobById(this.itemId).subscribe((data: any) => {
      this.manageJob = data;
     
    });
  }


  selectFile(event:any){
    
  
    this.aC.candidateFile= event.target.files[0];
    
  }
  addCandidate() {
    this.aC.manageJobs.id = this.itemId;

    this.appliedCandidateService.addCandidate(this.aC).subscribe((data: any) => {
      Swal.fire({
        title: 'Applied For Job SuccesFully',
        text:'Wait For The Company Response!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    });
  }

}



