import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../../entites/users';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUsersService {

baseUrl=environment.hostUrl+'/employee/allEmployee';
  constructor(private httpClient:HttpClient) { }

  // adding employees
  addEmployee(user:Users){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
    
    
       if(user.userImage)
       {
     
      formData.append("image",user.userImage);
       }
    
      else
      {
      formData.append("image",'null');
      }
    
      
       formData.append("data",new Blob([JSON.stringify(user)],{type:'application/json'}));
    
    
       return this.httpClient.post(`${this.baseUrl}/`,formData,{headers});
    
  }

  // update Employee
  updateEmployee(user:Users){
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
      //'Content-type':'multipart/form-data;boundary=BOEC8DO7-EBF1-4EA7-966C-E492A9F2C36E'
    });
       const formData = new FormData();
    
    
       if(user.userImage)
       {
     
      formData.append("image",user.userImage);
       }
    
      else
      {
      formData.append("image",'null');
      }
    
      
       formData.append("data",new Blob([JSON.stringify(user)],{type:'application/json'}));
    
    
       return this.httpClient.put(`${this.baseUrl}/`,formData,{headers});
  }

  // get Employee By Id
  getEmployeeById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

}
