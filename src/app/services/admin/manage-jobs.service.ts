import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManageJobs } from '../../entites/manage-jobs';
import { Assets } from '../../entites/assets';

@Injectable({
  providedIn: 'root'
})
export class ManageJobsService {

  baseUrl=environment.hostUrl+'/administration/manageJobs';

  constructor(private httpClient:HttpClient) { }

  addManageJobs(manageJobs:ManageJobs){
    return this.httpClient.post(`${this.baseUrl}/`,manageJobs);
 }
 // get All ManageJobs
 getAllManageJobs(pageNo:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
}
deleteManageJob(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// update by status
updateByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

  // search job
  searchManageJob(pageNo:number,pageSize:number,manageJob:ManageJobs){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,manageJob);
  }

// get  By Id
getManageJobById(jobId:number){
  return this.httpClient.get(`${this.baseUrl}/${jobId}`);
}
// update 
updateManageJob(manageJob:ManageJobs){
  return this.httpClient.put(`${this.baseUrl}/`,manageJob);

}
}
