import { formatNumber } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projects } from 'src/app/entites/projects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectService {
  
  baseUrl=environment.hostUrl + "/admin/projects"

      
  constructor(private httpClient:HttpClient) { }

  // add project 
  addProject(project:Projects){
    const headers = new HttpHeaders({
  'enctype': 'multipart/form-data'
  //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
});
   const formData = new FormData();


   if(project.projectFiles.length!=0)
   {
   for(const file of project.projectFiles)
  formData.append("files[]",file);
   }

  else
  {
  formData.append("files[]",'null');
  }

  
   formData.append("data",new Blob([JSON.stringify(project)],{type:'application/json'}));


   return this.httpClient.post(`${this.baseUrl}/create`,formData,{headers});
  }

  // update Project
  updateProject(project:Projects){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
       if(project.images.length!=0){
        for(const file of project.images)
            project.projectFiles.push(file);

            
          
       }
       if(project.projectFiles.length!=0)
   {
   for(const file of project.projectFiles)
  formData.append("files[]",file);
   }

  else
  {
  formData.append("files[]",'null');
  }
    
       formData.append("data",new Blob([JSON.stringify(project)],{type:'application/json'}));
    
    
    return this.httpClient.put(`${this.baseUrl}/`,formData,{headers});
  }

  // get all project
  getAllProject(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }
  
  // get all project By Order For Admin Dash
  getAllProjectByOrder(){
    return this.httpClient.get(`${this.baseUrl}/order`);
  }
  
  // getProjectById
  getProjectById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

   // getProjectById
   getProjectByClientId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/client/${pageNo}/${pageSize}/${id}`);
  }

  // getProjectById
  getProjectByUsersId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/users/${pageNo}/${pageSize}/${id}`);
  }


   // update project status
  updateProjectStatus(id:number,status:string,priority:string){
     let formData  = new FormData()
      formData.append('status',status);
      formData.append('priority',priority)
      formData.append('id',id.toString())

    return this.httpClient.put(`${this.baseUrl}/update`,formData);
  }

  

  // delete Project by id
    deleteProjectById(id:number){
     return this.httpClient.delete(`${this.baseUrl}/${id}`);
    }


    getAllProjects(){
      return this.httpClient.get(`${this.baseUrl}/assignedProjects`)
    }


     // search projects
  searchProjects(projects:Projects){
    return this.httpClient.post(`${this.baseUrl}/search`,projects);
  }
}
