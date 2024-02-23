import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskMembers } from 'src/app/entites/task-members';
import { ChangeTaskAssignedPayload } from 'src/app/payload/change-task-assigned-payload';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskMemberService {

  baseUrl=environment.hostUrl + '/admin/taskMembers'

  constructor(private httpClient:HttpClient) { }

  // add task member
  addTaskMembers(taskMembers:TaskMembers[]){
    return this.httpClient.post(`${this.baseUrl}/`,taskMembers);
  }

   // change task member
   changeTaskMembers(taskMember:ChangeTaskAssignedPayload){
    return this.httpClient.put(`${this.baseUrl}/changeLeader`,taskMember);
  }

// delete task member
deleteTaskMembers(id:any){
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }



}
