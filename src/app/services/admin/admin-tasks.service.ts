import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/entites/tasks';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminTasksService {

  baseUrl = environment.hostUrl + "/admin/Tasks"

  constructor(private httpClient:HttpClient) { }

  // add tasks 
  addTasks(tasks:Tasks){
    return this.httpClient.post(`${this.baseUrl}/`,tasks);
  }
  
  // update tasks
  updateTasks(tasks:Tasks){
    return this.httpClient.put(`${this.baseUrl}/`,tasks);
  }

  // get all task by id
  getAllTasksByProjectId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/project/${pageNo}/${pageSize}/${id}`);
  }

  // get all task by id
  getAllTaskByProjestIdAndStatus (pageNo:number,pageSize:number,id:number,status:string){
    return this.httpClient.get(`${this.baseUrl}/project/${pageNo}/${pageSize}/${id}/${status}`);
  }

  // update task status by id
  updateTaskStatus(status:string,id:number){
    return this.httpClient.get(`${this.baseUrl}/updateStatus/${id}/${status}`);
  }
  

    
  
 // delete task by id
 deleteTask(id:number){
  return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
}

//
getTaskById(id:number){
  return this.httpClient.get(`${this.baseUrl}/${id}`);
}

// get All Employee
getAllAssignedEmployeesofProject(projectId:number) {
  return this.httpClient.get(`${this.baseUrl}/pMembers/${projectId}`);
}

}
