import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectMembers } from 'src/app/entites/project-members';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectMemberService {

  baseUrl=environment.hostUrl + '/admin/projectMembers'

  constructor(private httpClient:HttpClient) { }

  // add project member
  addProjectMember(projectMember:ProjectMembers[]){
    return this.httpClient.post(`${this.baseUrl}/`,projectMember);
  }

  // update project member
  updateProjectMember(projectMember:ProjectMembers){
    return this.httpClient.put(`${this.baseUrl}/`,projectMember);
  }

  // get project member by id
  getProjectMemberById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get all project members
  getAllProjectMember(pageNo:number,pageSize:number){
    return  this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // get project member of project by project Id
  getProjectMemberByProjectId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/project/${pageNo}/${pageSize}/${id}`);
  }

  // get project member of project by user Id
  getProjectMemberByUserId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/user/${pageNo}/${pageSize}/${id}`);
  }

  // make project member leader
  makeLeader(projectMember:ProjectMembers){
    return this.httpClient.put(`${this.baseUrl}/leader`,projectMember);
  }


  // delete project member
  deleteProjectMember(id:any){
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }


  
}
