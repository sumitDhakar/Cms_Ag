import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Policy } from 'src/app/entites/policy';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPolicyService {

  baseUrl = environment.hostUrl +"/admin/policy"

  constructor(private httpClient:HttpClient) { }

  // add policy
  addPolicy(policy:Policy){
      const headers = new HttpHeaders({
        'enctype': 'multipart/form-data'
      });
      const formData = new FormData();
      if(policy.fileData.length>0){
        for(let file of policy.fileData)
        formData.append("files[]",file);
      }else
      formData.append("files[]","null");
      formData.append("data",new Blob([JSON.stringify(policy)],{type:'application/json'}));
      return this.httpClient.post(`${this.baseUrl}/`,formData,{headers});
  }

  // update Policy
  updatePolicy(policy:Policy){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const formData = new FormData();
    if(policy.fileData.length>0){
      for(let file of policy.fileData)
      formData.append("files[]",file);
    }else
    formData.append("files[]","null");
    formData.append("data",new Blob([JSON.stringify(policy)],{type:'application/json'}));
    return this.httpClient.put(`${this.baseUrl}/`,formData,{headers});
  }

  // get policy by id
  getPolicyById(id:number){
      return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get All policies
  getAllPolicies(pageNo:number,paegSize:number){
      return this.httpClient.get(`${this.baseUrl}/${pageNo}/${paegSize}`);
  }
  
  // delete policy by id
  deletePolicyById(id:number){
      return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
